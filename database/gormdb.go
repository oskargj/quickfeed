package database

import (
	"errors"
	"fmt"
	"log"
	"sort"
	"strings"

	pb "github.com/autograde/aguis/ag"
	"github.com/jinzhu/gorm"
)

// GormDB implements the Database interface.
type GormDB struct {
	conn *gorm.DB
}

// NewGormDB creates a new gorm database using the provided driver.
func NewGormDB(driver, path string, logger GormLogger) (*GormDB, error) {
	conn, err := gorm.Open(driver, path)
	if err != nil {
		return nil, err
	}

	if logger != nil {
		conn.SetLogger(logger)
	}
	conn.LogMode(logger != nil)

	if err := conn.AutoMigrate(
		&pb.User{},
		&pb.RemoteIdentity{},
		&pb.Course{},
		&pb.Enrollment{},
		&pb.Assignment{},
		&pb.Submission{},
		&pb.Group{},
		&pb.Repository{},
	).Error; err != nil {
		return nil, err
	}

	return &GormDB{conn}, nil
}

// GetUser implements the Database interface.
func (db *GormDB) GetUser(uid uint64) (*pb.User, error) {
	var user pb.User
	if err := db.conn.Preload("RemoteIdentities").First(&user, uid).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserByRemoteIdentity implements the Database interface.
func (db *GormDB) GetUserByRemoteIdentity(provider string, rid uint64, accessToken string) (*pb.User, error) {
	tx := db.conn.Begin()

	// Get the remote identity.
	var remoteIdentity pb.RemoteIdentity
	if err := tx.
		Where(&pb.RemoteIdentity{
			Provider: provider,
			RemoteId: rid,
		}).
		First(&remoteIdentity).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Update the access token.
	if err := tx.Model(&remoteIdentity).Update("access_token", accessToken).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Get the user
	var user pb.User
	if err := tx.Preload("RemoteIdentities").First(&user, remoteIdentity.UserId).Error; err != nil {
		tx.Rollback()
		return nil, err
	}
	if err := tx.Commit().Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUsers implements the Database interface.
func (db *GormDB) GetUsers(uids ...uint64) ([]*pb.User, error) {
	m := db.conn
	if len(uids) > 0 {
		m = m.Where(uids)
	}

	var users []*pb.User
	if err := m.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// UpdateUser implements the Database interface
func (db *GormDB) UpdateUser(user *pb.User) error {
	return db.conn.Model(&pb.User{}).Updates(user).Error
}

// SetAdmin implements the Database interface.
func (db *GormDB) SetAdmin(uid uint64) error {
	var user pb.User
	if err := db.conn.First(&user, uid).Error; err != nil {
		return err
	}
	//var admin bool
	admin := true
	user.IsAdmin = admin
	return db.conn.Save(&user).Error
}

// GetRemoteIdentity implements the Database interface.
func (db *GormDB) GetRemoteIdentity(provider string, rid uint64) (*pb.RemoteIdentity, error) {
	var remoteIdentity pb.RemoteIdentity
	if err := db.conn.Model(&pb.RemoteIdentity{}).
		Where(&pb.RemoteIdentity{
			Provider: provider,
			RemoteId: rid,
		}).
		First(&remoteIdentity).Error; err != nil {
		return nil, err
	}
	return &remoteIdentity, nil
}

// CreateUserFromRemoteIdentity implements the Database interface.
func (db *GormDB) CreateUserFromRemoteIdentity(user *pb.User, remoteIdentity *pb.RemoteIdentity) error {
	user.RemoteIdentities = []*pb.RemoteIdentity{remoteIdentity}
	if err := db.conn.Create(&user).Error; err != nil {
		return err
	}
	// The first user defaults to admin user.
	if user.Id == 1 {
		if err := db.SetAdmin(1); err != nil {
			return err
		}
		admin := true
		user.IsAdmin = admin
	}
	return nil
}

var (
	// ErrDuplicateIdentity is returned when trying to associate a remote identity
	// with a user account and the identity is already in use.
	ErrDuplicateIdentity = errors.New("remote identity register with another user")
	// ErrDuplicateGroup is returned when trying to create a group with the same
	// name as a previously registered group.
	ErrDuplicateGroup = errors.New("group name already registered")
	// ErrCourseExists is returned when trying to create an association in
	// the database for a DirectoryID that already exists in the database.
	ErrCourseExists = errors.New("course already exists on git provider")
	// ErrInsufficientAccess is returned when trying to update database
	// with insufficient access priviledges.
	ErrInsufficientAccess = errors.New("user must be admin to perform this operation")
)

// AssociateUserWithRemoteIdentity implements the Database interface.
func (db *GormDB) AssociateUserWithRemoteIdentity(uid uint64, provider string, rid uint64, accessToken string) error {
	var count uint64
	if err := db.conn.
		Model(&pb.RemoteIdentity{}).
		Where(&pb.RemoteIdentity{
			Provider: provider,
			RemoteId: rid,
		}).
		Not(&pb.RemoteIdentity{
			UserId: uid,
		}).
		Count(&count).Error; err != nil {
		//HACK: logging
		log.Println("GORM: associateUserWithRemoteIdentity fails with error ", err.Error())
		return err
	}
	if count > 0 {
		return ErrDuplicateIdentity
	}

	var remoteIdentity pb.RemoteIdentity
	//HACK: logging
	log.Println("GORM: associateUserWithRemoteIdentity finished")
	return db.conn.
		Where(pb.RemoteIdentity{Provider: provider, RemoteId: rid, UserId: uid}).
		Assign(pb.RemoteIdentity{AccessToken: accessToken}).
		FirstOrCreate(&remoteIdentity).Error
}

// CreateCourse implements the Database interface.
func (db *GormDB) CreateCourse(uid uint64, course *pb.Course) error {

	user, err := db.GetUser(uid)
	if err != nil {
		return err
	}
	if !user.IsAdmin {
		return ErrInsufficientAccess
	}

	var courses uint64
	if err := db.conn.Model(&pb.Course{}).Where(&pb.Course{
		DirectoryId: course.DirectoryId,
	}).Count(&courses).Error; err != nil {
		return err
	}
	if courses > 0 {
		return ErrCourseExists
	}

	//TODO(meling) these db updates should be done as a transaction
	if err := db.conn.Create(course).Error; err != nil {
		return err
	}
	if err := db.CreateEnrollment(&pb.Enrollment{UserId: uid, CourseId: course.Id}); err != nil {
		return err
	}
	if err := db.EnrollTeacher(uid, course.Id); err != nil {
		return err
	}
	return nil
}

// GetCourses implements the Database interface.
// If one or more course ids are provided, the corresponding courses
// are returned. Otherwise, all courses are returned.
func (db *GormDB) GetCourses(cids ...uint64) ([]*pb.Course, error) {
	m := db.conn
	if len(cids) > 0 {
		m = m.Where(cids)
	}
	var courses []*pb.Course
	if err := m.Find(&courses).Error; err != nil {
		return nil, err
	}
	return courses, nil
}

// GetAssignmentsByCourse implements the Database interface
func (db *GormDB) GetAssignmentsByCourse(cid uint64) ([]*pb.Assignment, error) {
	var course pb.Course
	if err := db.conn.Preload("Assignments").First(&course, cid).Error; err != nil {
		return nil, err
	}
	return course.Assignments, nil
}

// GetNextAssignment returns the next assignment to be approved for
// the given course, user, or group if the next assignment is a group lab.
func (db *GormDB) GetNextAssignment(cid uint64, uid uint64, gid uint64) (*pb.Assignment, error) {
	assignments, err := db.GetAssignmentsByCourse(cid)
	if err != nil {
		return nil, err
	}
	if len(assignments) < 1 {
		return nil, fmt.Errorf("no assignments found for course %d", cid)
	}
	sort.Slice(assignments, func(i, j int) bool {
		return assignments[i].Order < assignments[j].Order
	})
	approved := 0
	nxtToApprove := assignments[0]
	for _, v := range assignments {
		var sub *pb.Submission
		switch {
		case v.IsGrouplab && gid > 0:
			sub, err = db.GetSubmissionForGroup(v.CourseId, gid)
		case !v.IsGrouplab && uid > 0:
			sub, err = db.GetSubmissionForUser(v.CourseId, uid)
		default:
			// This is when uid or gid is set to 0, but there is a group or user lab
			// TODO: Fix so uid always is included and gid is optional
			sub = &pb.Submission{Approved: true}
			// return nil, gorm.ErrRecordNotFound
		}
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, err
		}
		if sub != nil && sub.Approved {
			approved++
			continue
		}
		nxtToApprove = v
		break
	}
	if len(assignments) == approved {
		return nil, fmt.Errorf("all assignments approved for user %d (group %d) in course %d", uid, gid, cid)
	}
	return nxtToApprove, nil
}

// CreateSubmission implements the Database interface
// TODO: Also check enrollment to see if the user is
// enrolled in the course the assignment belongs to
func (db *GormDB) CreateSubmission(submission *pb.Submission) error {
	// Primary key must be greater than 0.
	if submission.AssignmentId < 1 {
		return gorm.ErrRecordNotFound
	}

	// Either user or group id must be set, but not both.
	var m *gorm.DB
	switch {
	case submission.UserId > 0 && submission.GroupId > 0:
		return gorm.ErrRecordNotFound

	// TODO: change to pb.User, pb.Group
	case submission.UserId > 0:
		m = db.conn.First(&pb.User{Id: submission.UserId})
	case submission.GroupId > 0:
		m = db.conn.First(&pb.Group{Id: submission.GroupId})
	default:
		return gorm.ErrRecordNotFound
	}

	// Check that group exists.
	var group uint64
	if err := m.Count(&group).Error; err != nil {
		return err
	}

	// Checks that the assignment exists.
	var assignment uint64
	if err := db.conn.Model(&pb.Assignment{}).Where(&pb.Assignment{
		Id: submission.AssignmentId,
	}).Count(&assignment).Error; err != nil {
		return err
	}

	if assignment+group != 2 {
		return gorm.ErrRecordNotFound
	}
	return db.conn.Create(submission).Error
}

// GetSubmissionForUser implements the Database interface
func (db *GormDB) GetSubmissionForUser(aid uint64, uid uint64) (*pb.Submission, error) {
	var submission pb.Submission
	if err := db.conn.Where(&pb.Submission{AssignmentId: aid, UserId: uid}).Last(&submission).Error; err != nil {
		return nil, err
	}
	return &submission, nil
}

// GetSubmissionForGroup implements the Database interface
func (db *GormDB) GetSubmissionForGroup(aid uint64, gid uint64) (*pb.Submission, error) {
	var submission pb.Submission
	if err := db.conn.Where(&pb.Submission{AssignmentId: aid, GroupId: gid}).Last(&submission).Error; err != nil {
		return nil, err
	}
	return &submission, nil
}

// GetSubmissionsByID implements the Database interface
func (db *GormDB) GetSubmissionsByID(sid uint64) (*pb.Submission, error) {
	var submission pb.Submission
	if err := db.conn.First(&submission, sid).Error; err != nil {
		return nil, err
	}
	return &submission, nil
}

// UpdateSubmissionByID implements the Database interface
func (db *GormDB) UpdateSubmissionByID(sid uint64, approved bool) error {
	sub, err := db.GetSubmissionsByID(sid)
	if err != nil {
		return err
	}
	sub.Approved = approved
	return db.conn.Model(&pb.Submission{}).Update(sub).Error
}

// GetSubmissions implements the Database interface
func (db *GormDB) GetSubmissions(cid uint64, uid uint64) ([]*pb.Submission, error) {
	var course pb.Course
	if err := db.conn.Preload("Assignments").First(&course, cid).Error; err != nil {
		return nil, err
	}

	var latestSubs []*pb.Submission
	for _, a := range course.Assignments {
		temp, err := db.GetSubmissionForUser(a.Id, uid)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			return nil, err
		}
		latestSubs = append(latestSubs, temp)
	}
	return latestSubs, nil
}

// GetGroupSubmissions implements the Database interface
func (db *GormDB) GetGroupSubmissions(cid uint64, gid uint64) ([]*pb.Submission, error) {
	var course pb.Course
	if err := db.conn.Preload("Assignments").First(&course, cid).Error; err != nil {
		return nil, err
	}

	var latestSubs []*pb.Submission
	for _, a := range course.Assignments {
		temp, err := db.GetSubmissionForGroup(a.Id, gid)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			return nil, err
		}
		latestSubs = append(latestSubs, temp)
	}
	return latestSubs, nil
}

// CreateAssignment implements the Database interface
func (db *GormDB) CreateAssignment(assignment *pb.Assignment) error {
	// Course id and assignment order must be given.
	if assignment.CourseId < 1 || assignment.Order < 1 {
		return gorm.ErrRecordNotFound
	}

	var course uint64
	if err := db.conn.Model(&pb.Course{}).Where(&pb.Course{
		Id: assignment.CourseId,
	}).Count(&course).Error; err != nil {
		return err
	}
	if course != 1 {
		return gorm.ErrRecordNotFound
	}

	return db.conn.
		Where(pb.Assignment{
			CourseId: assignment.CourseId,
			Order:    assignment.Order,
		}).
		Assign(pb.Assignment{
			Name:        assignment.Name,
			Language:    assignment.Language,
			Deadline:    assignment.Deadline,
			AutoApprove: assignment.AutoApprove,
		}).FirstOrCreate(assignment).Error
}

// CreateEnrollment implements the Database interface.
// This method will overwrite the status field with models.Pending.
func (db *GormDB) CreateEnrollment(enrollment *pb.Enrollment) error {
	var user, course uint64
	if err := db.conn.Model(&pb.User{}).Where(&pb.User{
		Id: enrollment.UserId,
	}).Count(&user).Error; err != nil {
		return err
	}
	if err := db.conn.Model(&pb.Course{}).Where(&pb.Course{
		Id: enrollment.CourseId,
	}).Count(&course).Error; err != nil {
		return err
	}
	if user+course != 2 {
		return gorm.ErrRecordNotFound
	}

	enrollment.Status = pb.Enrollment_PENDING
	return db.conn.Create(&enrollment).Error
}

// EnrollStudent implements the Database interface.
func (db *GormDB) EnrollStudent(uid, cid uint64) error {
	return db.setEnrollment(uid, cid, pb.Enrollment_STUDENT)
}

// RejectEnrollment implements the Database interface.
func (db *GormDB) RejectEnrollment(uid, cid uint64) error {
	return db.setEnrollment(uid, cid, pb.Enrollment_REJECTED)
}

// EnrollTeacher implements the Database interface.
func (db *GormDB) EnrollTeacher(uid, cid uint64) error {
	return db.setEnrollment(uid, cid, pb.Enrollment_TEACHER)
}

// SetPendingEnrollment implements the Database interface.
func (db *GormDB) SetPendingEnrollment(uid, cid uint64) error {
	return db.setEnrollment(uid, cid, pb.Enrollment_PENDING)
}

// GetEnrollmentsByCourse implements the Database interface.
func (db *GormDB) GetEnrollmentsByCourse(cid uint64, statuses ...pb.Enrollment_UserStatus) ([]*pb.Enrollment, error) {
	return db.getEnrollments(&pb.Course{Id: cid}, statuses...)
}

func (db *GormDB) getEnrollments(model interface{}, statuses ...pb.Enrollment_UserStatus) ([]*pb.Enrollment, error) {

	if len(statuses) == 0 {
		statuses = []pb.Enrollment_UserStatus{
			pb.Enrollment_PENDING,
			pb.Enrollment_REJECTED,
			pb.Enrollment_STUDENT,
			pb.Enrollment_TEACHER,
		}
	}
	var enrollments []*pb.Enrollment
	if err := db.conn.Model(model).
		Where("status in (?)", statuses).
		Association("Enrollments").
		Find(&enrollments).Error; err != nil {
		return nil, err
	}

	return enrollments, nil
}

// GetEnrollmentByCourseAndUser return a record of Enrollment
func (db *GormDB) GetEnrollmentByCourseAndUser(cid uint64, uid uint64) (*pb.Enrollment, error) {
	var enrollment pb.Enrollment
	if err := db.conn.
		Where(&pb.Enrollment{
			CourseId: cid,
			UserId:   uid,
		}).
		First(&enrollment).Error; err != nil {
		return nil, err
	}
	return &enrollment, nil
}

func (db *GormDB) setEnrollment(uid, cid uint64, status pb.Enrollment_UserStatus) error {
	if status > pb.Enrollment_TEACHER {
		panic("invalid status")
	}

	return db.conn.
		Model(&pb.Enrollment{}).
		Where(&pb.Enrollment{CourseId: cid, UserId: uid}).
		Update(&pb.Enrollment{Status: status}).Error
}

// GetCoursesByUser returns all courses (with enrollment status)
// for the given user id.
// If enrollment statuses is provided, the set of courses returned
// is filtered according to these enrollment statuses.
func (db *GormDB) GetCoursesByUser(uid uint64, statuses ...pb.Enrollment_UserStatus) ([]*pb.Course, error) {
	enrollments, err := db.getEnrollments(&pb.User{Id: uid}, statuses...)
	if err != nil {
		return nil, err
	}

	var courseIDs []uint64
	m := make(map[uint64]*pb.Enrollment)
	for _, enrollment := range enrollments {
		m[enrollment.CourseId] = enrollment
		courseIDs = append(courseIDs, enrollment.CourseId)
	}

	if len(statuses) == 0 {
		courseIDs = nil
	} else if len(courseIDs) == 0 {
		// No need to query database since user have no enrolled courses.
		return []*pb.Course{}, nil
	}
	courses, err := db.GetCourses(courseIDs...)
	if err != nil {
		return nil, err
	}

	for _, course := range courses {
		// wants to have course.Enrolled = Enrollment.NONE, but conflicts with front-end where there is no NONE value
		course.Enrolled = -1
		if enrollment, ok := m[course.Id]; ok {
			course.Enrolled = enrollment.Status
		}
	}
	return courses, nil
}

// GetCourse implements the Database interface
func (db *GormDB) GetCourse(cid uint64) (*pb.Course, error) {
	var course pb.Course
	if err := db.conn.First(&course, cid).Error; err != nil {
		return nil, err
	}
	return &course, nil
}

// GetCourseByDirectoryID implements the Database interface
func (db *GormDB) GetCourseByDirectoryID(did uint64) (*pb.Course, error) {
	var course pb.Course
	if err := db.conn.First(&course, &pb.Course{DirectoryId: did}).Error; err != nil {
		return nil, err
	}
	return &course, nil
}

// UpdateCourse implements the Database interface
func (db *GormDB) UpdateCourse(course *pb.Course) error {
	return db.conn.Model(&pb.Course{}).Updates(course).Error
}

// CreateGroup creates a new group and assign users to newly created group
func (db *GormDB) CreateGroup(group *pb.Group) error {
	if group.CourseId == 0 {
		return gorm.ErrRecordNotFound
	}

	tx := db.conn.Begin()
	var course uint64
	if err := db.conn.Model(&pb.Course{}).Where(&pb.Course{
		Id: group.CourseId,
	}).Count(&course).Error; err != nil {
		return err
	}
	if course != 1 {
		return gorm.ErrRecordNotFound
	}

	if err := tx.Model(&pb.Group{}).Create(group).Error; err != nil {
		tx.Rollback()
		if strings.HasPrefix(err.Error(), "UNIQUE constraint failed") {
			return ErrDuplicateGroup
		}
		return err
	}
	var userids []uint64
	for _, u := range group.Users {
		userids = append(userids, u.Id)
	}
	query := tx.Model(&pb.Enrollment{}).
		Where(&pb.Enrollment{
			CourseId: group.CourseId,
		}).
		Where("user_id IN (?) AND status IN (?)", userids, []pb.Enrollment_UserStatus{
			pb.Enrollment_STUDENT, pb.Enrollment_TEACHER}).
		Updates(&pb.Enrollment{
			GroupId: group.Id,
		})

	if query.Error != nil {
		tx.Rollback()
		return query.Error
	}

	if query.RowsAffected != int64(len(userids)) {
		tx.Rollback()
		return gorm.ErrRecordNotFound
	}

	tx.Commit()
	return nil
}

// GetGroup returns a group specified by id return error if does not exits
func (db *GormDB) GetGroup(gid uint64) (*pb.Group, error) {
	var group pb.Group
	if err := db.conn.Preload("Enrollments").First(&group, gid).Error; err != nil {
		return nil, err
	}
	var userIDs []uint64
	for _, enrollment := range group.Enrollments {
		userIDs = append(userIDs, enrollment.UserId)
	}
	if len(userIDs) > 0 {
		users, err := db.GetUsers(userIDs...)
		if err != nil {
			return nil, err
		}
		group.Users = users
	}
	return &group, nil
}

// UpdateGroupStatus updates status field of a group
func (db *GormDB) UpdateGroupStatus(group *pb.Group) error {
	return db.conn.Model(group).Update("status", group.Status).Error
}

// GetGroupsByCourse returns a list of groups
func (db *GormDB) GetGroupsByCourse(cid uint64) ([]*pb.Group, error) {
	var groups []*pb.Group
	if err := db.conn.
		Preload("Enrollments").
		Where(&pb.Group{
			CourseId: cid,
		}).
		Find(&groups).Error; err != nil {
		return nil, err
	}

	for _, group := range groups {
		var userIDs []uint64
		for _, enrollment := range group.Enrollments {
			userIDs = append(userIDs, enrollment.UserId)
		}
		if len(userIDs) > 0 {
			users, err := db.GetUsers(userIDs...)
			if err != nil {
				return nil, err
			}
			group.Users = users
		}

	}
	return groups, nil

}

// DeleteGroup delete a group
func (db *GormDB) DeleteGroup(gid uint64) error {
	group, err := db.GetGroup(gid)
	if err != nil {
		return err
	}

	tx := db.conn.Begin()
	if err := tx.Delete(group).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Exec("UPDATE enrollments SET group_id= ? WHERE group_id= ?", 0, gid).Error; err != nil {
		tx.Rollback()
		return err
	}
	tx.Commit()
	return nil
}

// CreateRepository implements the Database interface
func (db *GormDB) CreateRepository(repo *pb.Repository) error {
	if repo.DirectoryId == 0 || repo.RepositoryId == 0 {
		return gorm.ErrRecordNotFound
	}

	if repo.UserId > 0 {
		err := db.conn.First(&pb.User{}, repo.UserId).Error
		if err != nil {
			return err
		}
	}

	return db.conn.Create(repo).Error
}

// GetRepository imlements the Database interface
func (db *GormDB) GetRepository(rid uint64) (*pb.Repository, error) {
	// This uses the repositoryid from the provider to search with, and not
	// the id of the entry in the database
	var repo pb.Repository

	if err := db.conn.First(&repo, &pb.Repository{RepositoryId: rid}).Error; err != nil {
		return nil, err
	}

	return &repo, nil
}

// GetRepositoriesByCourseIDandUserID Fetches Repo based on courseid, userid and type
func (db *GormDB) GetRepositoriesByCourseIDandUserID(cid uint64, uid uint64) (*pb.Repository, error) {
	course, err := db.GetCourse(cid)
	if err != nil {
		return nil, gorm.ErrRecordNotFound
	}

	var repo pb.Repository
	if err := db.conn.First(&repo, &pb.Repository{DirectoryId: course.DirectoryId, UserId: uid}).Error; err != nil {
		return nil, err
	}

	return &repo, nil
}

// GetRepoByCourseIDUserIDandType Fetches Repo based on courseid, userid and type
func (db *GormDB) GetRepoByCourseIDUserIDandType(cid uint64, uid uint64, repoType pb.Repository_RepoType) (*pb.Repository, error) {
	course, err := db.GetCourse(cid)
	if err != nil {
		return nil, gorm.ErrRecordNotFound
	}

	var repo pb.Repository
	if err := db.conn.First(&repo, &pb.Repository{DirectoryId: course.DirectoryId, UserId: uid, RepoType: repoType}).Error; err != nil {
		return nil, err
	}

	return &repo, nil
}

// GetRepositoriesByDirectory implements the database interface
func (db *GormDB) GetRepositoriesByDirectory(did uint64) ([]*pb.Repository, error) {

	var repos []*pb.Repository
	if err := db.conn.Find(&repos, &pb.Repository{DirectoryId: did}).Error; err != nil {
		return nil, err
	}
	return repos, nil
}

// UpdateGroup updates a group
func (db *GormDB) UpdateGroup(group *pb.Group) error {
	if group.CourseId == 0 {
		return gorm.ErrRecordNotFound
	}
	tx := db.conn.Begin()
	var course uint64
	if err := db.conn.Model(&pb.Course{}).Where(&pb.Course{
		Id: group.CourseId,
	}).Count(&course).Error; err != nil {
		return err
	}
	if course != 1 {
		return gorm.ErrRecordNotFound
	}
	if err := tx.Model(&pb.Group{}).Updates(group).Error; err != nil {
		tx.Rollback()
		if strings.HasPrefix(err.Error(), "UNIQUE constraint failed") {
			return ErrDuplicateGroup
		}
		return err
	}
	if err := tx.Exec("UPDATE enrollments SET group_id= ? WHERE group_id= ?", 0, group.Id).Error; err != nil {
		tx.Rollback()
		return err
	}
	var userids []uint64
	for _, u := range group.Users {
		userids = append(userids, u.Id)
	}
	query := tx.Model(&pb.Enrollment{}).
		Where(&pb.Enrollment{
			CourseId: group.CourseId,
		}).
		Where("user_id IN (?) AND status IN (?)", userids, []pb.Enrollment_UserStatus{
			pb.Enrollment_STUDENT, pb.Enrollment_TEACHER}).
		Updates(&pb.Enrollment{
			GroupId: group.Id,
		})

	if query.Error != nil {
		tx.Rollback()
		return query.Error
	}

	if query.RowsAffected != int64(len(userids)) {
		tx.Rollback()
		return gorm.ErrRecordNotFound
	}

	tx.Commit()
	return nil
}

// GetRepositoriesByCourseIDAndType returns repos beloning to directoryID and with repo type
func (db *GormDB) GetRepositoriesByCourseIDAndType(cid uint64, repoType pb.Repository_RepoType) ([]*pb.Repository, error) {

	course, err := db.GetCourse(cid)
	if err != nil {
		return nil, gorm.ErrRecordNotFound
	}

	var repos []*pb.Repository
	if err := db.conn.Find(&repos, &pb.Repository{DirectoryId: course.DirectoryId, RepoType: repoType}).Error; err != nil {
		return nil, err
	}
	return repos, nil
}

// Close closes the gorm database.
func (db *GormDB) Close() error {
	return db.conn.Close()
}

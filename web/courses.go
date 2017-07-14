package web

import (
	"context"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Sirupsen/logrus"
	"github.com/autograde/aguis/database"
	"github.com/autograde/aguis/models"
	"github.com/autograde/aguis/scm"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

// MaxWait is the maximum time a request is allowed to stay open before
// aborting.
const MaxWait = 60 * time.Second

// NewCourseRequest represents a request for a new course.
type NewCourseRequest struct {
	Name string `json:"name"`
	Code string `json:"code"`
	Year uint   `json:"year"`
	Tag  string `json:"tag"`

	Provider    string `json:"provider"`
	DirectoryID uint64 `json:"directoryid"`
}

func (cr *NewCourseRequest) valid() bool {
	return cr != nil &&
		cr.Name != "" &&
		cr.Code != "" &&
		(cr.Provider == "github" || cr.Provider == "gitlab") &&
		cr.DirectoryID != 0 &&
		cr.Year != 0 &&
		cr.Tag != ""
}

// EnrollUserRequest represent a request for enrolling a user to a course
type EnrollUserRequest struct {
	UserID   uint64 `json:"userid"`
	CourseID uint64 `json:"courseid"`
	Status   uint   `json:"status"`
}

func (eur *EnrollUserRequest) valid() bool {
	return eur.CourseID != 0 && eur.UserID != 0 && eur.Status <= models.Accepted
}

// ListCourses returns a JSON object containing all the courses in the database.
func ListCourses(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		var courses []*models.Course
		courses, err := db.GetCourses()
		if err != nil {
			return err
		}
		return c.JSONPretty(http.StatusOK, courses, "\t")
	}
}

// ListAssignments lists all the assignment found in a place
func ListAssignments(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		// TODO check if the user has right to show the assignments.
		// same as courses above, should not return to unauthorised users
		id, err := strconv.ParseUint(c.Param("cid"), 10, 64)
		if err != nil {
			return err
		}
		var assignments []*models.Assignment
		assignments, err = db.GetAssignmentsByCourse(id)
		if err != nil {
			return err
		}
		return c.JSONPretty(http.StatusOK, assignments, "\t")
	}
}

// Default repository names.
const (
	InfoRepo       = "course-info"
	AssignmentRepo = "assignments"
	TestsRepo      = "tests"
	SolutionsRepo  = "solutions"
)

// NewCourse creates a new course and associates it with an organization.
func NewCourse(logger *logrus.Logger, db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		var cr NewCourseRequest
		if err := c.Bind(&cr); err != nil {
			return err
		}
		if !cr.valid() {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid payload")
		}

		if c.Get(cr.Provider) == nil {
			return echo.NewHTTPError(http.StatusBadRequest, "provider "+cr.Provider+" not registered")
		}
		s := c.Get(cr.Provider).(scm.SCM)

		ctx, cancel := context.WithTimeout(c.Request().Context(), MaxWait)
		defer cancel()

		directory, err := s.GetDirectory(ctx, cr.DirectoryID)
		if err != nil {
			return err
		}

		var paths = []string{InfoRepo, AssignmentRepo, TestsRepo, SolutionsRepo}
		for _, path := range paths {
			repo, err := s.CreateRepository(
				ctx,
				&scm.CreateRepositoryOptions{
					Path:      path,
					Directory: directory},
			)
			if err != nil {
				return err
			}
			logger.WithField("repo", repo).Println("Created new repository")
		}

		course := models.Course{
			Name:        cr.Name,
			Code:        cr.Code,
			Year:        cr.Year,
			Tag:         cr.Tag,
			Provider:    cr.Provider,
			DirectoryID: directory.ID,
		}

		if err := db.CreateCourse(&course); err != nil {
			return err
		}

		return c.JSONPretty(http.StatusCreated, &course, "\t")
	}
}

// SetEnrollment sets the enrollment for a user in a course.
func SetEnrollment(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		courseID, err := strconv.ParseUint(c.Param("cid"), 10, 64)
		if err != nil || courseID == 0 {
			return c.NoContent(http.StatusNotFound)
		}
		var userID uint64
		userID, err = strconv.ParseUint(c.Param("uid"), 10, 64)
		if err != nil || userID == 0 {
			return c.NoContent(http.StatusNotFound)
		}

		var eur EnrollUserRequest
		if err := c.Bind(&eur); err != nil {
			return err
		}
		if !eur.valid() || eur.UserID != userID || eur.CourseID != courseID {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid payload")
		}

		enrollment := models.Enrollment{
			UserID:   eur.UserID,
			CourseID: eur.CourseID,
		}
		if err := db.CreateEnrollment(&enrollment); err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.NoContent(http.StatusNotFound)
			}
			return err
		}

		user := c.Get("user").(*models.User)
		if !user.IsAdmin {
			// This means that the request has been accepted for processing, i.e., we need to wait for a teacher to accept the enrollment.
			// TODO: Rename Accepted to Approved to avoid this confusion.
			return c.NoContent(http.StatusAccepted)
		}

		switch eur.Status {
		case models.Accepted:
			if err := db.AcceptEnrollment(enrollment.ID); err != nil {
				return err
			}
		case models.Rejected:
			if err := db.RejectEnrollment(enrollment.ID); err != nil {
				return err
			}
		}
		return c.NoContent(http.StatusOK)
	}
}

// GetCourse find course by id and return JSON object.
func GetCourse(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("cid"), 10, 64)
		if err != nil || id == 0 {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid course id")
		}

		course, err := db.GetCourse(id)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.NoContent(http.StatusNotFound)
			}
			return err

		}

		return c.JSONPretty(http.StatusOK, course, "\t")
	}
}

// UpdateCourse updates an existing course
func UpdateCourse(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("cid"), 10, 64)
		if err != nil || id == 0 {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid course id")
		}

		oldcr, err := db.GetCourse(id)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.NoContent(http.StatusNotFound)
			}
			return err

		}

		var newcr NewCourseRequest

		if err := c.Bind(&newcr); err != nil {
			return err
		}

		if !newcr.valid() {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid payload")
		}

		if c.Get(newcr.Provider) == nil {
			return echo.NewHTTPError(http.StatusBadRequest, "provider "+newcr.Provider+" not registered")
		}
		s := c.Get(newcr.Provider).(scm.SCM)

		ctx, cancel := context.WithTimeout(c.Request().Context(), MaxWait)
		defer cancel()

		// Check that the directory exists.
		_, err = s.GetDirectory(ctx, newcr.DirectoryID)
		if err != nil {
			return err
		}

		course := models.Course{
			ID:          oldcr.ID,
			Name:        newcr.Name,
			Code:        newcr.Code,
			Year:        newcr.Year,
			Tag:         newcr.Tag,
			Provider:    newcr.Provider,
			DirectoryID: newcr.DirectoryID,
		}

		if err := db.UpdateCourse(&course); err != nil {
			return err
		}

		return c.NoContent(http.StatusOK)

	}
}

// GetEnrollmentsByCourse get all enrollments related to a course
func GetEnrollmentsByCourse(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := ParseUintParam(c.Param("cid"))
		if err != nil || id == 0 {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid course id")
		}
		statuses := parseAllStatuses(c.QueryParam("status"))

		courses, err := db.GetEnrollmentsByCourse(id, statuses...)
		if err != nil {
			return err
		}

		for _, enrollment := range courses {
			enrollment.User, err = db.GetUser(enrollment.UserID)
			if err != nil {
				return err
			}
		}

		return c.JSONPretty(http.StatusOK, courses, "\t")
	}
}

// GetEnrollmentsByUser get all enrollments related to a user
func GetEnrollmentsByUser(db database.Database) echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := ParseUintParam(c.Param("uid"))
		if err != nil || id == 0 {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid user id")
		}
		//statuses := c.QueryParam("status")
		statuses := parseAllStatuses(c.QueryParam("status"))

		users, err := db.GetEnrollmentsByUser(id, statuses...)
		if err != nil {
			return err
		}

		for _, enrollment := range users {
			enrollment.Course, err = db.GetCourse(enrollment.CourseID)
			if err != nil {
				return err
			}
		}

		return c.JSONPretty(http.StatusOK, users, "\t")
	}
}

func parseAllStatuses(status string) []uint {
	var statusCodes []uint
	if status != "" {
		for _, part := range strings.Split(status, ",") {
			code, err := parseStatus(part)
			if err == nil {
				statusCodes = append(statusCodes, code)
			}
		}
	}
	return statusCodes
}

func parseStatus(status string) (uint, error) {
	switch status {
	case "pending":
		return models.Pending, nil
	case "rejected":
		return models.Rejected, nil
	case "accepted":
		return models.Accepted, nil
	default:
		return 0, &(statusParseError{err: "Error parsing status"})
	}
}

type statusParseError struct {
	err string
}

func (e *statusParseError) Error() string {
	return e.err
}

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(15));
__export(__webpack_require__(8));
__export(__webpack_require__(9));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(21));
__export(__webpack_require__(10));
__export(__webpack_require__(22));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));
__export(__webpack_require__(27));
__export(__webpack_require__(28));
__export(__webpack_require__(29));
__export(__webpack_require__(30));
__export(__webpack_require__(31));
__export(__webpack_require__(32));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __webpack_require__(6);
function trimChars(str, char) {
    if (str.length === 0) {
        return "";
    }
    let start = 0;
    let end = str.length - 1;
    while (str[start] === char) {
        start++;
    }
    while (str[end] === char) {
        end--;
    }
    if (start >= end) {
        return "";
    }
    return str.substring(start, end + 1);
}
exports.trimChars = trimChars;
function combinePath(...parts) {
    if (parts.length === 0) {
        return "";
    }
    let newPath = "";
    for (let i = 0; i < parts.length; i++) {
        if (i !== 0 || (i === 0 && parts[0].length > 0 && parts[0][0] === "/")) {
            newPath += "/";
        }
        newPath += trimChars(parts[i], "/");
    }
    return newPath;
}
exports.combinePath = combinePath;
function combineAbsPath(...parts) {
    return combinePath("", ...parts);
}
exports.combineAbsPath = combineAbsPath;
class NavigationHelper {
    constructor(thisObject) {
        this.onPreNavigation = event_1.newEvent("NavigationHelper.onPreNavigation");
        this.DEFAULT_VALUE = "";
        this.navObj = "__navObj";
        this.path = {};
        this.thisObject = thisObject;
    }
    static getParts(path) {
        return this.removeEmptyEntries(path.split("/"));
    }
    static removeEmptyEntries(array) {
        const newArray = [];
        array.map((v) => {
            if (v.length > 0) {
                newArray.push(v);
            }
        });
        return newArray;
    }
    static getOptionalField(field) {
        const tField = field.trim();
        if (tField.length > 2 && tField.charAt(0) === "{" && tField.charAt(tField.length - 1) === "}") {
            const parts = tField.substr(1, tField.length - 2).split(":");
            return { name: parts[0], type: (parts.length > 1 ? parts[1] : undefined) };
        }
        return null;
    }
    static isINavObject(obj) {
        return obj && obj.path;
    }
    static handleClick(e, callback) {
        if (e.shiftKey || e.ctrlKey || e.button === 1) {
            return;
        }
        else {
            e.preventDefault();
            callback();
        }
    }
    get defaultPage() {
        return this.DEFAULT_VALUE;
    }
    set defaultPage(value) {
        this.DEFAULT_VALUE = value;
    }
    registerFunction(path, callback) {
        const pathParts = NavigationHelper.getParts(path);
        if (pathParts.length === 0) {
            throw new Error("Can't register function on empty path");
        }
        const curObj = this.createNavPath(pathParts);
        const temp = {
            path: pathParts,
            func: callback,
        };
        curObj[this.navObj] = temp;
    }
    navigateTo(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path.length === 0) {
                path = this.DEFAULT_VALUE;
            }
            const pathParts = NavigationHelper.getParts(path);
            if (pathParts.length === 0) {
                throw new Error("Can't navigate to an empty path");
            }
            const curObj = this.getNavPath(pathParts);
            if (!curObj || !curObj[this.navObj]) {
                return null;
            }
            const navObj = curObj[this.navObj];
            const navInfo = {
                matchPath: navObj.path,
                realPath: pathParts,
                params: this.createParamsObj(navObj.path, pathParts),
            };
            if (!navInfo.params) {
                console.error("One or more parameteres has wrong value", navInfo.matchPath, navInfo.realPath);
                return null;
            }
            this.onPreNavigation({ target: this, navInfo });
            if (this.checkAuthentication) {
                if (!this.checkAuthentication(navInfo)) {
                    return null;
                }
            }
            return navObj.func.call(this.thisObject, navInfo);
        });
    }
    parseValue(value, type) {
        switch (type) {
            case "string":
                return value;
            case "number":
                const num = parseFloat(value);
                if (isNaN(num)) {
                    return undefined;
                }
                return num;
            case "boolean":
                if (value.toLowerCase() === "true") {
                    return true;
                }
                else if (value.toLowerCase() === "false") {
                    return false;
                }
                return undefined;
        }
    }
    createParamsObj(matchPath, realPath) {
        if (matchPath.length !== realPath.length) {
            throw new Error("trying to match different paths");
        }
        const returnObj = {};
        for (let i = 0; i < matchPath.length; i++) {
            const param = NavigationHelper.getOptionalField(matchPath[i]);
            if (param) {
                if (param.type) {
                    if (param.type === "string" || param.type === "boolean" || param.type === "number") {
                        const value = this.parseValue(realPath[i], param.type);
                        if (value !== undefined) {
                            returnObj[param.name] = value;
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        console.error("Type not supportet in navigation path: ", param.type, matchPath, realPath);
                    }
                }
                else {
                    returnObj[param.name] = realPath[i];
                }
            }
        }
        return returnObj;
    }
    getNavPath(pathParts) {
        let curObj = this.path;
        for (const part of pathParts) {
            let curIndex = part;
            if (!curObj[curIndex]) {
                curIndex = "*";
            }
            const curWrap = curObj[curIndex];
            if (NavigationHelper.isINavObject(curWrap) || curIndex === this.navObj) {
                throw new Error("Can't navigate to: " + curIndex);
            }
            if (!curWrap) {
                return null;
            }
            curObj = curWrap;
        }
        return curObj;
    }
    createNavPath(pathParts) {
        let curObj = this.path;
        for (const part of pathParts) {
            let curIndex = part;
            const optional = NavigationHelper.getOptionalField(curIndex);
            if (optional) {
                curIndex = "*";
            }
            let curWrap = curObj[curIndex];
            if (NavigationHelper.isINavObject(curWrap) || curIndex === this.navObj) {
                throw new Error("Can't assign path to: " + curIndex);
            }
            if (!curWrap) {
                curWrap = {};
                curObj[curIndex] = curWrap;
            }
            curObj = curWrap;
        }
        return curObj;
    }
}
exports.NavigationHelper = NavigationHelper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isCourse(value) {
    return value
        && typeof value.id === "number"
        && typeof value.name === "string"
        && typeof value.tag === "string";
}
exports.isCourse = isCourse;
var CourseUserState;
(function (CourseUserState) {
    CourseUserState[CourseUserState["pending"] = 0] = "pending";
    CourseUserState[CourseUserState["rejected"] = 1] = "rejected";
    CourseUserState[CourseUserState["student"] = 2] = "student";
    CourseUserState[CourseUserState["teacher"] = 3] = "teacher";
})(CourseUserState = exports.CourseUserState || (exports.CourseUserState = {}));
function courseUserStateToString(state) {
    return state.map((sta) => {
        switch (sta) {
            case CourseUserState.pending:
                return "pending";
            case CourseUserState.rejected:
                return "rejected";
            case CourseUserState.student:
                return "accepted";
            case CourseUserState.teacher:
                return "accepted";
            default:
                return "";
        }
    }).join(",");
}
exports.courseUserStateToString = courseUserStateToString;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
function isViewPage(item) {
    if (item instanceof ViewPage) {
        return true;
    }
    return false;
}
exports.isViewPage = isViewPage;
class ViewPage {
    constructor() {
        this.template = null;
        this.navHelper = new NavigationHelper_1.NavigationHelper(this);
        this.currentPage = "";
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    setPath(path) {
        this.pagePath = path;
    }
    renderMenu(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    renderContent(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageContent = yield this.navHelper.navigateTo(page);
            this.currentPage = page;
            if (pageContent) {
                return pageContent;
            }
            return React.createElement("div", null, "404 Not found");
        });
    }
}
exports.ViewPage = ViewPage;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class UserView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
        };
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.state = {
            users: nextProps.users,
        };
    }
    render() {
        let searchForm = null;
        if (this.props.addSearchOption) {
            const searchIcon = React.createElement("span", { className: "input-group-addon" },
                React.createElement("i", { className: "glyphicon glyphicon-search" }));
            searchForm = React.createElement(components_1.Search, { className: "input-group", addonBefore: searchIcon, placeholder: "Search for students", onChange: (query) => this.handleOnchange(query) });
        }
        return (React.createElement("div", null,
            searchForm,
            React.createElement(components_1.DynamicTable, { header: this.getTableHeading(), data: this.state.users, selector: (item) => this.getTableSelector(item) })));
    }
    getTableHeading() {
        let heading = ["Name", "Email", "Student ID"];
        if (this.props.userMan) {
            heading = heading.concat("Action");
        }
        return heading;
    }
    getTableSelector(user) {
        let selector = [
            user.firstname + " " + user.lastname,
            React.createElement("a", { href: "mailto:" + user.email }, user.email),
            user.personid.toString(),
        ];
        if (this.props.userMan) {
            if (this.props.userMan.isAdmin(user)) {
                selector = selector.concat(React.createElement("button", { className: "btn btn-danger", onClick: () => this.handleAdminRoleClick(user), "data-toggle": "tooltip", title: "Demote from Admin" }, "Demote"));
            }
            else {
                selector = selector.concat(React.createElement("button", { className: "btn btn-primary", onClick: () => this.handleAdminRoleClick(user), "data-toggle": "tooltip", title: "Promote to Admin" }, "Promote"));
            }
        }
        return selector;
    }
    handleAdminRoleClick(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.props.userMan && this.props.navMan) {
                const res = this.props.userMan.changeAdminRole(user);
                this.props.navMan.refresh();
                return res;
            }
            return false;
        });
    }
    handleOnchange(query) {
        query = query.toLowerCase();
        const filteredData = [];
        this.props.users.forEach((user) => {
            if (user.firstname.toLowerCase().indexOf(query) !== -1
                || user.lastname.toLowerCase().indexOf(query) !== -1
                || user.email.toLowerCase().indexOf(query) !== -1
                || user.personid.toString().indexOf(query) !== -1) {
                filteredData.push(user);
            }
        });
        this.setState({
            users: filteredData,
        });
    }
}
exports.UserView = UserView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function newEvent(info) {
    const callbacks = [];
    const handler = function EventHandler(event) {
        callbacks.map(((v) => v(event)));
    };
    handler.info = info;
    handler.addEventListener = (callback) => {
        callbacks.push(callback);
    };
    handler.removeEventListener = (callback) => {
        const index = callbacks.indexOf(callback);
        if (index < 0) {
            console.log(callback);
            throw Error("Event does noe exist");
        }
        callbacks.splice(index, 1);
    };
    return handler;
}
exports.newEvent = newEvent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MapHelper {
    static mapTo(map, callback) {
        const returnArray = [];
        const keys = Object.keys(map);
        for (const a of keys) {
            const index = parseInt(a, 10);
            const temp = map[index];
            if (temp) {
                returnArray.push(callback(temp, index, map));
            }
        }
        return returnArray;
    }
    static forEach(map, callback) {
        const keys = Object.keys(map);
        for (const a of keys) {
            const index = parseInt(a, 10);
            const temp = map[index];
            if (temp) {
                callback(temp, index, map);
            }
        }
    }
    static find(map, callback) {
        const keys = Object.keys(map);
        for (const a of keys) {
            const index = parseInt(a, 10);
            const temp = map[index];
            if (temp && callback(temp, index, map)) {
                return temp;
            }
        }
        return null;
    }
    static toArray(map) {
        const returnArray = [];
        const keys = Object.keys(map);
        for (const a of keys) {
            const index = parseInt(a, 10);
            const temp = map[index];
            if (temp) {
                returnArray.push(temp);
            }
        }
        return returnArray;
    }
}
exports.MapHelper = MapHelper;
function mapify(obj, callback) {
    const newObj = {};
    obj.forEach((ele, index, array) => {
        newObj[callback(ele, index, obj)] = ele;
    });
    return newObj;
}
exports.mapify = mapify;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
class NavHeaderBar extends React.Component {
    componentDidMount() {
        const temp = this.refs.button;
        temp.setAttribute("data-toggle", "collapse");
        temp.setAttribute("data-target", "#" + this.props.id);
        temp.setAttribute("aria-expanded", "false");
    }
    render() {
        return React.createElement("div", { className: "navbar-header" },
            React.createElement("button", { ref: "button", type: "button", className: "navbar-toggle collapsed" },
                React.createElement("span", { className: "sr-only" }, "Toggle navigation"),
                React.createElement("span", { className: "icon-bar" }),
                React.createElement("span", { className: "icon-bar" }),
                React.createElement("span", { className: "icon-bar" })),
            React.createElement("a", { className: "navbar-brand", onClick: (e) => {
                    NavigationHelper_1.NavigationHelper.handleClick(e, () => {
                        this.props.brandClick();
                    });
                }, href: ";/" }, this.props.brandName));
    }
}
exports.NavHeaderBar = NavHeaderBar;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
class NavMenu extends React.Component {
    render() {
        const items = this.props.links.map((v, i) => {
            let active = "";
            if (v.active) {
                active = "active";
            }
            if (v.uri) {
                return React.createElement("li", { key: i, className: active },
                    React.createElement("a", { onClick: (e) => this.handleClick(e, v), href: "/" + v.uri }, v.name));
            }
            else {
                return React.createElement("li", { key: i, className: active },
                    React.createElement("span", { className: "header" }, v.name));
            }
        });
        return React.createElement("ul", { className: "nav nav-list" }, items);
    }
    handleClick(e, link) {
        NavigationHelper_1.NavigationHelper.handleClick(e, () => {
            if (this.props.onClick) {
                this.props.onClick(link);
            }
        });
    }
}
exports.NavMenu = NavMenu;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class ProgressBar extends React.Component {
    render() {
        const progressBarStyle = {
            width: this.props.progress + "%",
        };
        return (React.createElement("div", { className: "progress" },
            React.createElement("div", { className: "progress-bar", role: "progressbar", "aria-valuenow": this.props.progress, "aria-valuemin": "0", "aria-valuemax": "100", style: progressBarStyle },
                this.props.progress,
                "%")));
    }
}
exports.ProgressBar = ProgressBar;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(33));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(36));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
class CollapsableNavMenu extends React.Component {
    constructor() {
        super(...arguments);
        this.topItems = [];
    }
    render() {
        const children = this.props.links.map((e, i) => {
            return this.renderTopElement(i, e);
        });
        return React.createElement("ul", { className: "nav nav-list" }, children);
    }
    toggle(index) {
        const animations = [];
        this.topItems.forEach((temp, i) => {
            if (i === index) {
                if (this.collapseIsOpen(temp)) {
                }
                else {
                    animations.push(this.openCollapse(temp));
                }
            }
            else {
                animations.push(this.closeIfOpen(temp));
            }
        });
        setTimeout(() => {
            animations.forEach((e) => {
                e();
            });
        }, 10);
    }
    collapseIsOpen(ele) {
        return ele.classList.contains("in");
    }
    closeIfOpen(ele) {
        if (this.collapseIsOpen(ele)) {
            return this.closeCollapse(ele);
        }
        return () => {
            "do nothing";
        };
    }
    openCollapse(ele) {
        ele.classList.remove("collapse");
        ele.classList.add("collapsing");
        return () => {
            ele.style.height = ele.scrollHeight + "px";
            setTimeout(() => {
                ele.classList.remove("collapsing");
                ele.classList.add("collapse");
                ele.classList.add("in");
                ele.style.height = null;
            }, 350);
        };
    }
    closeCollapse(ele) {
        ele.style.height = ele.clientHeight + "px";
        ele.classList.add("collapsing");
        ele.classList.remove("collapse");
        ele.classList.remove("in");
        return () => {
            ele.style.height = null;
            setTimeout(() => {
                ele.classList.remove("collapsing");
                ele.classList.add("collapse");
                ele.style.height = null;
            }, 350);
        };
    }
    handleClick(e, link) {
        NavigationHelper_1.NavigationHelper.handleClick(e, () => {
            if (this.props.onClick) {
                this.props.onClick(link);
            }
        });
    }
    renderChilds(index, link) {
        const isActive = link.active ? "active" : "";
        if (link.uri) {
            return React.createElement("li", { key: index, className: isActive },
                React.createElement("a", { onClick: (e) => this.handleClick(e, link), href: "/" + link.uri }, link.name));
        }
        else {
            return React.createElement("li", { key: index, className: isActive },
                React.createElement("span", { className: "header" }, link.name));
        }
    }
    renderTopElement(index, links) {
        const isActive = links.item.active ? "active" : "";
        const subClass = "nav nav-sub collapse " + (links.item.active ? "in" : "");
        let children = [];
        if (links.children) {
            children = links.children.map((e, i) => {
                return this.renderChilds(i, e);
            });
        }
        return React.createElement("li", { key: index, className: isActive },
            React.createElement("a", { onClick: (e) => {
                    this.handleClick(e, links.item);
                }, href: "/" + links.item.uri },
                links.item.name,
                React.createElement("span", { style: { float: "right" } },
                    React.createElement("span", { className: "glyphicon glyphicon-menu-down" }))),
            React.createElement("ul", { ref: (ele) => {
                    if (ele) {
                        this.topItems[index] = ele;
                    }
                }, className: subClass }, children));
    }
}
exports.CollapsableNavMenu = CollapsableNavMenu;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ReactDOM = __webpack_require__(14);
const components_1 = __webpack_require__(1);
const managers_1 = __webpack_require__(11);
const ErrorPage_1 = __webpack_require__(37);
const HelpPage_1 = __webpack_require__(38);
const HomePage_1 = __webpack_require__(40);
const StudentPage_1 = __webpack_require__(41);
const TeacherPage_1 = __webpack_require__(44);
const AdminPage_1 = __webpack_require__(46);
const NavBarLogin_1 = __webpack_require__(48);
const NavBarMenu_1 = __webpack_require__(49);
const LoginPage_1 = __webpack_require__(50);
const ServerProvider_1 = __webpack_require__(51);
const HttpHelper_1 = __webpack_require__(52);
class AutoGrader extends React.Component {
    constructor(props) {
        super();
        this.userMan = props.userManager;
        this.navMan = props.navigationManager;
        const curUser = this.userMan.getCurrentUser();
        this.state = {
            activePage: undefined,
            topLinks: [],
            curUser,
            currentContent: React.createElement("div", null, "No Content Available"),
        };
        (() => __awaiter(this, void 0, void 0, function* () {
            this.setState({ topLinks: yield this.generateTopLinksFor(curUser) });
        }))();
        this.navMan.onNavigate.addEventListener((e) => this.handleNavigation(e));
        this.userMan.onLogin.addEventListener((e) => __awaiter(this, void 0, void 0, function* () {
            console.log("Sign in");
            this.setState({
                curUser: e.user,
                topLinks: yield this.generateTopLinksFor(e.user),
            });
        }));
        this.userMan.onLogout.addEventListener((e) => __awaiter(this, void 0, void 0, function* () {
            console.log("Sign out");
            this.setState({
                curUser: null,
                topLinks: yield this.generateTopLinksFor(null),
            });
        }));
    }
    handleNavigation(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subPage = e.subPage;
            const newContent = yield this.renderTemplate(e.page, e.page.template);
            const tempLink = this.state.topLinks.slice();
            this.checkLinks(tempLink);
            this.setState({ activePage: e.page, topLinks: tempLink, currentContent: newContent });
        });
    }
    generateTopLinksFor(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user) {
                const basis = [];
                if (yield this.userMan.isTeacher(user)) {
                    basis.push({ name: "Teacher", uri: "app/teacher/", active: false });
                }
                basis.push({ name: "Student", uri: "app/student/", active: false });
                if (this.userMan.isAdmin(user)) {
                    basis.push({ name: "Admin", uri: "app/admin", active: false });
                }
                basis.push({ name: "Help", uri: "app/help", active: false });
                return basis;
            }
            else {
                return [
                    { name: "Help", uri: "app/help", active: false },
                    { name: "New Course", uri: "app/admin/courses/new", active: false },
                ];
            }
        });
    }
    componentDidMount() {
        const curUrl = location.pathname;
        if (curUrl === "/") {
            this.navMan.navigateToDefault();
        }
        else {
            this.navMan.navigateTo(curUrl);
        }
    }
    render() {
        if (this.state.activePage) {
            return this.state.currentContent;
        }
        else {
            return React.createElement("h1", null, "404 not found");
        }
    }
    handleClick(link) {
        if (link.uri) {
            this.navMan.navigateTo(link.uri);
        }
        else {
            console.warn("Warning! Empty link detected", link);
        }
    }
    renderActiveMenu(page, menu) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page) {
                return yield page.renderMenu(menu);
            }
            return "";
        });
    }
    renderActivePage(page, subPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (page) {
                return yield page.renderContent(subPage);
            }
            return React.createElement("h1", null, "404 Page not found");
        });
    }
    checkLinks(links) {
        this.navMan.checkLinks(links);
    }
    renderTemplate(page, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let body;
            const content = yield this.renderActivePage(page, this.subPage);
            const loginLink = [
                { name: "Github", uri: "app/login/login/github" },
                { name: "Gitlab", uri: "app/login/login/gitlab" },
            ];
            switch (name) {
                case "frontpage":
                    body = (React.createElement(components_1.Row, { className: "container-fluid" },
                        React.createElement("div", { className: "col-xs-12" }, content)));
                default:
                    body = (React.createElement(components_1.Row, { className: "container-fluid" },
                        React.createElement("div", { className: "col-md-2 col-sm-3 col-xs-12" }, yield this.renderActiveMenu(page, 0)),
                        React.createElement("div", { className: "col-md-10 col-sm-9 col-xs-12" }, content)));
            }
            return (React.createElement("div", null,
                React.createElement(components_1.NavBar, { id: "top-bar", isFluid: false, isInverse: true, onClick: (link) => this.handleClick(link), brandName: "Auto Grader" },
                    React.createElement(NavBarMenu_1.NavBarMenu, { links: this.state.topLinks, onClick: (link) => this.handleClick(link) }),
                    React.createElement(NavBarLogin_1.NavBarLogin, { user: this.state.curUser, links: loginLink, onClick: (link) => this.handleClick(link) })),
                body));
        });
    }
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const DEBUG_BROWSER = "DEBUG_BROWSER";
        const DEBUG_SERVER = "DEBUG_SERVER";
        let curRunning;
        curRunning = DEBUG_SERVER;
        if (window.location.host.match("localhost")
            || localStorage.getItem("debug")) {
            curRunning = DEBUG_BROWSER;
        }
        const tempData = new managers_1.TempDataProvider();
        let userMan;
        let courseMan;
        let navMan;
        if (curRunning === DEBUG_SERVER) {
            const httpHelper = new HttpHelper_1.HttpHelper("/api/v1");
            const serverData = new ServerProvider_1.ServerProvider(httpHelper);
            userMan = new managers_1.UserManager(serverData);
            courseMan = new managers_1.CourseManager(serverData);
            navMan = new managers_1.NavigationManager(history);
        }
        else {
            userMan = new managers_1.UserManager(tempData);
            courseMan = new managers_1.CourseManager(tempData);
            navMan = new managers_1.NavigationManager(history);
            const user = yield userMan.tryLogin("test@testersen.no", "1234");
        }
        yield userMan.checkUserLoggedIn();
        window.debugData = { tempData, userMan, courseMan, navMan };
        navMan.setDefaultPath("app/home");
        const all = [];
        all.push(navMan.registerPage("app/home", new HomePage_1.HomePage()));
        all.push(navMan.registerPage("app/student", new StudentPage_1.StudentPage(userMan, navMan, courseMan)));
        all.push(navMan.registerPage("app/teacher", new TeacherPage_1.TeacherPage(userMan, navMan, courseMan)));
        all.push(navMan.registerPage("app/admin", new AdminPage_1.AdminPage(navMan, userMan, courseMan)));
        all.push(navMan.registerPage("app/help", new HelpPage_1.HelpPage(navMan)));
        all.push(navMan.registerPage("app/login", new LoginPage_1.LoginPage(navMan, userMan)));
        Promise.all(all);
        navMan.registerErrorPage(404, new ErrorPage_1.ErrorPage());
        navMan.onNavigate.addEventListener((e) => {
            console.log(e);
        });
        ReactDOM.render(React.createElement(AutoGrader, { userManager: userMan, navigationManager: navMan }), document.getElementById("root"));
    });
}
main();


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavHeaderBar_1 = __webpack_require__(8);
class NavBar extends React.Component {
    render() {
        return React.createElement("nav", { className: this.renderNavBarClass() },
            React.createElement("div", { className: this.renderIsFluid() },
                React.createElement(NavHeaderBar_1.NavHeaderBar, { id: this.props.id, brandName: this.props.brandName, brandClick: () => this.handleClick({ name: "Home", uri: "/" }) }),
                React.createElement("div", { className: "collapse navbar-collapse", id: this.props.id }, this.props.children)));
    }
    handleClick(link) {
        if (this.props.onClick) {
            this.props.onClick(link);
        }
    }
    renderIsFluid() {
        let name = "container";
        if (this.props.isFluid) {
            name += "-fluid";
        }
        return name;
    }
    renderNavBarClass() {
        let name = "navbar navbar-absolute-top";
        if (this.props.isInverse) {
            name += " navbar-inverse";
        }
        else {
            name += " navbar-default";
        }
        return name;
    }
}
exports.NavBar = NavBar;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class NavMenuFormatable extends React.Component {
    render() {
        const items = this.props.items.map((v, i) => {
            return React.createElement("li", { key: i },
                React.createElement("a", { href: "#", onClick: () => { this.handleItemClick(v); } }, this.renderObj(v)));
        });
        return React.createElement("ul", { className: "nav nav-pills nav-stacked" }, items);
    }
    renderObj(item) {
        if (this.props.formater) {
            return this.props.formater(item);
        }
        return item.toString();
    }
    handleItemClick(item) {
        if (this.props.onClick) {
            this.props.onClick(item);
        }
    }
}
exports.NavMenuFormatable = NavMenuFormatable;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class DynamicTable extends React.Component {
    render() {
        const footer = this.props.footer;
        const rows = this.props.data.map((v, i) => {
            return this.renderRow(v, i);
        });
        const tableFooter = footer ? React.createElement("tfoot", null,
            React.createElement("tr", null, this.renderCells(footer))) : null;
        return (React.createElement("table", { className: this.props.onRowClick ? "table table-hover" : "table" },
            React.createElement("thead", null,
                React.createElement("tr", null, this.renderCells(this.props.header, true))),
            React.createElement("tbody", null, rows),
            tableFooter));
    }
    renderCells(values, th = false) {
        return values.map((v, i) => {
            if (th) {
                return React.createElement("th", { key: i }, v);
            }
            return React.createElement("td", { key: i }, v);
        });
    }
    renderRow(item, i) {
        return (React.createElement("tr", { key: i, onClick: (e) => this.handleRowClick(item) }, this.renderCells(this.props.selector(item))));
    }
    handleRowClick(item) {
        if (this.props.onRowClick) {
            this.props.onRowClick(item);
        }
    }
}
exports.DynamicTable = DynamicTable;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
function Row(props) {
    return React.createElement("div", { className: props.className ? "row " + props.className : "row" }, props.children);
}
exports.Row = Row;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const LabResultView_1 = __webpack_require__(20);
class StudentLab extends React.Component {
    render() {
        return React.createElement(LabResultView_1.LabResultView, { course: this.props.course, labInfo: this.props.assignment });
    }
}
exports.StudentLab = StudentLab;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class LabResultView extends React.Component {
    render() {
        if (this.props.labInfo.latest) {
            return (React.createElement("div", { className: "col-md-9 col-sm-9 col-xs-12" },
                React.createElement("div", { className: "result-content", id: "resultview" },
                    React.createElement("section", { id: "result" },
                        React.createElement(components_1.LabResult, { course_name: this.props.course.name, lab: this.props.labInfo.assignment.name, progress: this.props.labInfo.latest.score }),
                        React.createElement(components_1.LastBuild, { test_cases: this.props.labInfo.latest.testCases, score: this.props.labInfo.latest.score, weight: this.props.labInfo.latest.weight }),
                        React.createElement(components_1.LastBuildInfo, { pass_tests: this.props.labInfo.latest.passedTests, fail_tests: this.props.labInfo.latest.failedTests, exec_time: this.props.labInfo.latest.executetionTime, build_time: this.props.labInfo.latest.buildDate, build_id: this.props.labInfo.latest.buildId }),
                        React.createElement(components_1.Row, null,
                            React.createElement("div", { className: "col-lg-12" },
                                React.createElement("div", { className: "well" },
                                    React.createElement("code", { id: "logs" }, this.props.labInfo.latest.buildLog))))))));
        }
        return React.createElement("h1", null, "No subissions have been submitted yet");
    }
}
exports.LabResultView = LabResultView;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
class NavDropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
        };
    }
    render() {
        const children = this.props.items.map((item, index) => {
            return React.createElement("li", { key: index },
                React.createElement("a", { href: "/" + item.uri, onClick: (e) => {
                        NavigationHelper_1.NavigationHelper.handleClick(e, () => {
                            this.toggleOpen();
                            this.props.itemClick(item, index);
                        });
                    } }, item.name));
        });
        return React.createElement("div", { className: this.getButtonClass() },
            React.createElement("button", { className: "btn btn-default dropdown-toggle", type: "button", onClick: () => this.toggleOpen() },
                this.renderActive(),
                React.createElement("span", { className: "caret" })),
            React.createElement("ul", { className: "dropdown-menu" }, children));
    }
    getButtonClass() {
        if (this.state.isOpen) {
            return "button open";
        }
        else {
            return "button";
        }
    }
    toggleOpen() {
        const newState = !this.state.isOpen;
        this.setState({ isOpen: newState });
    }
    renderActive() {
        if (this.props.items.length === 0) {
            return "";
        }
        let curIndex = this.props.selectedIndex;
        if (curIndex >= this.props.items.length || curIndex < 0) {
            curIndex = 0;
        }
        return this.props.items[curIndex].name;
    }
}
exports.NavDropdown = NavDropdown;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class LabResult extends React.Component {
    render() {
        let labHeading;
        if (this.props.student) {
            labHeading = React.createElement("h3", null,
                this.props.student.firstname + " " + this.props.student.lastname,
                ": ",
                this.props.lab);
        }
        else {
            labHeading = React.createElement("div", null,
                React.createElement("h1", null, this.props.course_name),
                React.createElement("p", { className: "lead" },
                    "Your progress on ",
                    React.createElement("strong", null,
                        React.createElement("span", { id: "lab-headline" }, this.props.lab))));
        }
        return (React.createElement(components_1.Row, null,
            React.createElement("div", { className: "col-lg-12" },
                labHeading,
                React.createElement(components_1.ProgressBar, { progress: this.props.progress })),
            React.createElement("div", { className: "col-lg-6" },
                React.createElement("p", null,
                    React.createElement("strong", { id: "status" }, "Status: Nothing built yet."))),
            React.createElement("div", { className: "col-lg-6" },
                React.createElement("p", null,
                    React.createElement("strong", { id: "pushtime" }, "Code delievered: - ")))));
    }
}
exports.LabResult = LabResult;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class LastBuild extends React.Component {
    render() {
        return (React.createElement(components_1.Row, null,
            React.createElement("div", { className: "col-lg-12" },
                React.createElement(components_1.DynamicTable, { header: ["Test name", "Score", "Weight"], data: this.props.test_cases, selector: (item) => [item.name, item.score.toString() + "/"
                            + item.points.toString() + " pts", item.weight.toString() + " pts"], footer: ["Total score", this.props.score.toString() + "%", this.props.weight.toString() + "%"] }))));
    }
}
exports.LastBuild = LastBuild;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class LastBuildInfo extends React.Component {
    render() {
        return (React.createElement(components_1.Row, null,
            React.createElement("div", { className: "col-lg-8" },
                React.createElement("h2", null, "Latest build"),
                React.createElement("p", { id: "passes" },
                    "Number of passed tests:  ",
                    this.props.pass_tests),
                React.createElement("p", { id: "fails" },
                    "Number of failed tests:  ",
                    this.props.fail_tests),
                React.createElement("p", { id: "buildtime" },
                    "Execution time:  ",
                    this.props.exec_time),
                React.createElement("p", { id: "timedate" },
                    "Build date:  ",
                    this.props.build_time.toString()),
                React.createElement("p", { id: "buildid" },
                    "Build ID: ",
                    this.props.build_id)),
            React.createElement("div", { className: "col-lg-4 hidden-print" },
                React.createElement("h2", null, "Actions"),
                React.createElement(components_1.Row, null,
                    React.createElement("div", { className: "col-lg-12" },
                        React.createElement("p", null,
                            React.createElement("button", { type: "button", id: "rebuild", className: "btn btn-primary", onClick: () => this.handleClick() }, "Rebuild")))))));
    }
    handleClick() {
        console.log("Rebuilding...");
    }
}
exports.LastBuildInfo = LastBuildInfo;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class CoursesOverview extends React.Component {
    render() {
        const courses = this.props.courseOverview.map((val, key) => {
            return React.createElement(components_1.CoursePanel, { key: key, course: val.course, labs: val.assignments, navMan: this.props.navMan });
        });
        let added = 0;
        let index = 1;
        let l = courses.length;
        for (index; index < l; index++) {
            if (index % 4 === 0) {
                courses.splice(index + added, 0, React.createElement("div", { key: index * 10000, className: "visible-md-block visible-sm-block visible-lg-block clearfix" }));
                l += 1;
                added += 1;
            }
            else if (index % 2 === 0) {
                courses.splice(index + added, 0, React.createElement("div", { key: index * 10000, className: "visible-md-block visible-sm-block clearfix" }));
                l += 1;
                added += 1;
            }
        }
        return (React.createElement("div", null,
            React.createElement("h1", null, "Your Courses"),
            React.createElement(components_1.Row, null, courses)));
    }
}
exports.CoursesOverview = CoursesOverview;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class CoursePanel extends React.Component {
    render() {
        const pathPrefix = "app/student/course/" + this.props.course.id + "/lab/";
        return (React.createElement("div", { className: "col-lg-3 col-md-6 col-sm-6" },
            React.createElement("div", { className: "panel panel-primary" },
                React.createElement("div", { className: "panel-heading clickable", onClick: () => this.handleCourseClick() }, this.props.course.name),
                React.createElement("div", { className: "panel-body" },
                    React.createElement(components_1.DynamicTable, { header: ["Labs", "Score", "Deadline"], data: this.props.labs, selector: (item) => {
                            const score = item.latest ? (item.latest.score.toString() + "%") : "N/A";
                            return [
                                item.assignment.name,
                                score,
                                item.assignment.deadline.toDateString(),
                            ];
                        }, onRowClick: (lab) => this.handleRowClick(pathPrefix, lab.assignment) })))));
    }
    handleRowClick(pathPrefix, lab) {
        if (lab) {
            this.props.navMan.navigateTo(pathPrefix + lab.id);
        }
    }
    handleCourseClick() {
        const uri = "app/student/course/" + this.props.course.id;
        this.props.navMan.navigateTo(uri);
    }
}
exports.CoursePanel = CoursePanel;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ProgressBar_1 = __webpack_require__(10);
class SingleCourseOverview extends React.Component {
    render() {
        const labs = this.props.courseAndLabs.assignments.map((submission, k) => {
            let submissionInfo = React.createElement("div", null, "No submissions");
            if (submission.latest) {
                submissionInfo = React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-md-6 col-lg-8" },
                        React.createElement(ProgressBar_1.ProgressBar, { progress: submission.latest.score })),
                    React.createElement("div", { className: "col-md-3 col-lg-2" },
                        React.createElement("span", { className: "text-success" },
                            " Passed: ",
                            submission.latest.passedTests,
                            " "),
                        React.createElement("span", { className: "text-danger" },
                            " Failed: ",
                            submission.latest.failedTests,
                            " ")),
                    React.createElement("div", { className: "col-md-3 col-lg-2" },
                        "Deadline:",
                        React.createElement("span", { style: { display: "inline-block", verticalAlign: "top", paddingLeft: "10px" } },
                            submission.assignment.deadline.toDateString(),
                            " ",
                            React.createElement("br", null),
                            submission.assignment.deadline.toLocaleTimeString("en-GB"))));
            }
            return (React.createElement("li", { key: k, className: "list-group-item clickable", onClick: () => this.props.onLabClick(submission.assignment.courseid, submission.assignment.id) },
                React.createElement("strong", null, submission.assignment.name),
                submissionInfo));
        });
        return (React.createElement("div", null,
            React.createElement("h1", null, this.props.courseAndLabs.course.name),
            React.createElement("div", null,
                React.createElement("ul", { className: "list-group" }, labs))));
    }
}
exports.SingleCourseOverview = SingleCourseOverview;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class GroupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            students: this.props.students,
            selectedStudents: [],
            errorFlash: null,
        };
    }
    render() {
        const searchIcon = React.createElement("span", { className: "input-group-addon" },
            React.createElement("i", { className: "glyphicon glyphicon-search" }));
        const studentSearchBar = React.createElement(components_1.Search, { className: "input-group", addonBefore: searchIcon, placeholder: "Search for students", onChange: (query) => this.handleSearch(query) });
        const selectableStudents = [];
        for (const student of this.state.students) {
            selectableStudents.push(React.createElement("li", { key: student.user.id, className: "list-group-item" },
                student.user.firstname + " " + student.user.lastname,
                React.createElement("button", { type: "button", className: "btn btn-outline-success", onClick: () => this.handleAddToGroupOnClick(student) },
                    React.createElement("i", { className: "glyphicon glyphicon-plus-sign" }))));
        }
        const selectedStudents = [];
        for (const student of this.state.selectedStudents) {
            selectedStudents.push(React.createElement("li", { key: student.user.id, className: "list-group-item" },
                student.user.firstname + " " + student.user.lastname,
                React.createElement("button", { className: "btn btn-outline-primary", onClick: () => this.handleRemoveFromGroupOnClick(student) },
                    React.createElement("i", { className: "glyphicon glyphicon-minus-sign" }))));
        }
        return (React.createElement("div", { className: "student-group-container" },
            React.createElement("h1", null, "Create a Group"),
            this.state.errorFlash,
            React.createElement("form", { className: this.props.className, onSubmit: (e) => this.handleFormSubmit(e) },
                React.createElement("div", { className: "form-group row" },
                    React.createElement("label", { className: "col-sm-1 col-form-label", htmlFor: "tag" }, "Name:"),
                    React.createElement("div", { className: "col-sm-11" },
                        React.createElement("input", { type: "text", className: "form-control", id: "name", placeholder: "Enter group name", name: "name", value: this.state.name, onChange: (e) => this.handleInputChange(e) }))),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("fieldset", null,
                            React.createElement("legend", null,
                                "Available Students ",
                                React.createElement("small", { className: "hint" },
                                    "select ",
                                    this.props.capacity,
                                    " students for your group")),
                            studentSearchBar,
                            " ",
                            React.createElement("br", null),
                            React.createElement("ul", { className: "student-group list-group" }, selectableStudents))),
                    React.createElement("div", { className: "col-sm-6" },
                        React.createElement("fieldset", null,
                            React.createElement("legend", null, "Selected Students"),
                            React.createElement("ul", { className: "student-group list-group" }, selectedStudents)))),
                React.createElement("div", { className: "form-group row" },
                    React.createElement("div", { className: "col-sm-offset-5 col-sm-2" },
                        React.createElement("button", { className: this.state.selectedStudents.length
                                === this.props.capacity ? "btn btn-primary active" : "btn btn-primary disabled", type: "submit" }, "Create"))))));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const errors = this.groupValidate();
        if (errors.length > 0) {
            const errorArr = [];
            for (let i = 0; i < errors.length; i++) {
                errorArr.push(React.createElement("li", { key: i }, errors[i]));
            }
            const flash = React.createElement("div", { className: "alert alert-danger" },
                React.createElement("h4", null,
                    errorArr.length,
                    " errors prohibited Group from being saved: "),
                React.createElement("ul", null, errorArr));
            this.setState({
                errorFlash: flash,
            });
        }
        else {
            this.setState({
                errorFlash: null,
            });
            console.log("state", this.state);
            console.log("group ", this.state.name, this.state.selectedStudents);
        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    handleAddToGroupOnClick(student) {
        const index = this.state.students.indexOf(student);
        if (index >= 0) {
            const newSelectedArr = this.state.selectedStudents.concat(student);
            this.setState({
                students: this.state.students.filter((_, i) => i !== index),
                selectedStudents: newSelectedArr,
            });
        }
    }
    handleRemoveFromGroupOnClick(student) {
        const index = this.state.selectedStudents.indexOf(student);
        if (index >= 0) {
            const newStudentsdArr = this.state.students.concat(student);
            this.setState({
                students: newStudentsdArr,
                selectedStudents: this.state.selectedStudents.filter((_, i) => i !== index),
            });
        }
    }
    handleSearch(query) {
        query = query.toLowerCase();
        const filteredData = [];
        this.props.students.forEach((student) => {
            if ((student.user.firstname.toLowerCase().indexOf(query) !== -1
                || student.user.lastname.toLowerCase().indexOf(query) !== -1
                || student.user.email.toString().indexOf(query) !== -1)
                && this.state.selectedStudents.indexOf(student) === -1) {
                filteredData.push(student);
            }
        });
        this.setState({
            students: filteredData,
        });
    }
    groupValidate() {
        const errors = [];
        if (this.state.name === "") {
            errors.push("Group Name cannot be blank");
        }
        if (this.state.selectedStudents.length !== this.props.capacity) {
            errors.push("Group members must be equal to " + this.props.capacity.toString());
        }
        return errors;
    }
}
exports.GroupForm = GroupForm;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class Button extends React.Component {
    render() {
        return (React.createElement("button", { className: this.props.className ? "btn " + this.props.className : "btn", type: this.props.type ? this.props.type : "", onClick: () => this.handleOnclick() }, this.props.text ? this.props.text : ""));
    }
    handleOnclick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }
}
exports.Button = Button;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.courseData ? this.props.courseData.name : "",
            code: this.props.courseData ? this.props.courseData.code : "",
            tag: this.props.courseData ? this.props.courseData.tag : "",
            year: this.props.courseData ? this.props.courseData.year.toString() : "",
            provider: this.props.courseData ? this.props.courseData.provider : "",
            directoryid: this.props.courseData ? this.props.courseData.directoryid : 0,
            organisations: null,
        };
    }
    render() {
        const getTitleText = this.props.courseData ? "Edit Course" : "Create New Course";
        return (React.createElement("div", null,
            React.createElement("h1", null, getTitleText),
            React.createElement("form", { className: this.props.className ? this.props.className : "", onSubmit: (e) => this.handleFormSubmit(e) },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label col-sm-2" }, "Provider:"),
                    React.createElement("div", { className: "col-sm-10" },
                        React.createElement("label", { className: "radio-inline" },
                            React.createElement("input", { type: "radio", name: "provider", value: "github", defaultChecked: this.props.courseData
                                    && this.props.courseData.provider === "github" ? true : false, onClick: (e) => this.getOrganizations(e, this.updateOrganisationDivs) }),
                            "Github"),
                        React.createElement("label", { className: "radio-inline" },
                            React.createElement("input", { type: "radio", name: "provider", defaultChecked: this.props.courseData
                                    && this.props.courseData.provider === "gitlab" ? true : false, value: "gitlab", onClick: (e) => this.getOrganizations(e, this.updateOrganisationDivs) }),
                            "Gitlab"))),
                React.createElement("div", { className: "form-group", id: "organisation-container" }, this.state.organisations),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label col-sm-2", htmlFor: "name" }, "Course Name:"),
                    React.createElement("div", { className: "col-sm-10" },
                        React.createElement("input", { type: "text", className: "form-control", id: "name", placeholder: "Enter course name", name: "name", value: this.state.name, onChange: (e) => this.handleInputChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label col-sm-2", htmlFor: "code" }, "Course Code:"),
                    React.createElement("div", { className: "col-sm-10" },
                        React.createElement("input", { type: "text", className: "form-control", id: "code", placeholder: "Enter course code", name: "code", value: this.state.code, onChange: (e) => this.handleInputChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label col-sm-2", htmlFor: "year" }, "Year:"),
                    React.createElement("div", { className: "col-sm-10" },
                        React.createElement("input", { type: "text", className: "form-control", id: "year", placeholder: "Enter year", name: "year", value: this.state.year, onChange: (e) => this.handleInputChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", { className: "control-label col-sm-2", htmlFor: "tag" }, "Semester:"),
                    React.createElement("div", { className: "col-sm-10" },
                        React.createElement("input", { type: "text", className: "form-control", id: "tag", placeholder: "Enter semester", name: "tag", value: this.state.tag, onChange: (e) => this.handleInputChange(e) }))),
                React.createElement("div", { className: "form-group" },
                    React.createElement("div", { className: "col-sm-offset-2 col-sm-10" },
                        React.createElement(components_1.Button, { className: "btn btn-primary", text: this.props.courseData ? "Update" : "Create", type: "submit" }))))));
    }
    handleFormSubmit(e) {
        e.preventDefault();
        const errors = this.courseValidate();
        const courseData = {
            name: this.state.name,
            code: this.state.code,
            tag: this.state.tag,
            year: parseInt(this.state.year, 10),
            provider: this.state.provider,
            directoryid: this.state.directoryid,
        };
        if (this.props.courseData) {
            courseData.id = this.props.courseData.id;
        }
        this.props.onSubmit(courseData, errors);
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    handleOrgClick(dirId) {
        if (dirId) {
            this.setState({
                directoryid: dirId,
            });
        }
    }
    getOrganizations(e, callback) {
        const pvdr = e.target.value;
        this.setState({
            provider: pvdr,
        });
        const pRes = this.props.courseMan.getDirectories(pvdr);
        pRes.then((orgs) => {
            callback.call(this, orgs);
        });
    }
    updateOrganisationDivs(orgs) {
        const organisationDetails = [];
        for (let i = 0; i < orgs.length; i++) {
            organisationDetails.push(React.createElement("button", { key: i, className: "btn organisation", onClick: () => this.handleOrgClick(orgs[i].id) },
                React.createElement("div", { className: "organisationInfo" },
                    React.createElement("img", { src: orgs[i].avatar, className: "img-rounded", width: 80, height: 80 }),
                    React.createElement("div", { className: "caption" }, orgs[i].path)),
                React.createElement("input", { type: "radio" })));
        }
        let orgMsg;
        if (this.state.provider === "github") {
            orgMsg = React.createElement("p", null,
                "Select a GitHub organization for your course. (Don't see your organization below? Autograder needs access to your organization. Grant access ",
                React.createElement("a", { href: "https://github.com/settings/applications", target: "_blank" }, " here"),
                ".)");
        }
        else {
            orgMsg = React.createElement("p", null, "Select a GitLab group.");
        }
        const orgDivs = React.createElement("div", null,
            React.createElement("label", { className: "control-label col-sm-2" }, "Organization:"),
            React.createElement("div", { className: "organisationWrap col-sm-10" },
                orgMsg,
                React.createElement("div", { className: "btn-group organisationBtnGroup", "data-toggle": "buttons" }, organisationDetails)));
        this.setState({
            organisations: orgDivs,
        });
    }
    courseValidate() {
        const errors = [];
        if (this.state.name === "") {
            errors.push("Course Name cannot be blank");
        }
        if (this.state.code === "") {
            errors.push("Course Tag cannot be blank.");
        }
        if (this.state.tag === "") {
            errors.push("Semester cannot be blank.");
        }
        if (this.state.provider === "") {
            errors.push("Provider cannot be blank.");
        }
        if (this.state.directoryid === 0) {
            errors.push("Organisation cannot be blank.");
        }
        const year = parseInt(this.state.year, 10);
        if (this.state.year === "") {
            errors.push("Year cannot be blank.");
        }
        else if (Number.isNaN(year)) {
            errors.push("Year must be a number");
        }
        else if (year < (new Date()).getFullYear()) {
            errors.push("Year must be greater or equal to current year");
        }
        return errors;
    }
}
exports.CourseForm = CourseForm;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class Results extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.students[0] && this.props.students[0].course.assignments[0]) {
            this.state = {
                assignment: this.props.students[0].course.assignments[0],
                students: this.props.students,
            };
        }
        else {
            this.state = {
                assignment: undefined,
                students: this.props.students,
            };
        }
    }
    render() {
        let studentLab = null;
        if (this.props.students.length > 0 && this.state.assignment) {
            studentLab = React.createElement(components_1.StudentLab, { course: this.props.course, assignment: this.state.assignment });
        }
        const searchIcon = React.createElement("span", { className: "input-group-addon" },
            React.createElement("i", { className: "glyphicon glyphicon-search" }));
        return (React.createElement("div", null,
            React.createElement("h1", null,
                "Result: ",
                this.props.course.name),
            React.createElement(components_1.Row, null,
                React.createElement("div", { className: "col-lg6 col-md-6 col-sm-12" },
                    React.createElement(components_1.Search, { className: "input-group", addonBefore: searchIcon, placeholder: "Search for students", onChange: (query) => this.handleOnchange(query) }),
                    React.createElement(components_1.DynamicTable, { header: this.getResultHeader(), data: this.state.students, selector: (item) => this.getResultSelector(item) })),
                React.createElement("div", { className: "col-lg-6 col-md-6 col-sm-12" }, studentLab))));
    }
    getResultHeader() {
        let headers = ["Name", "Slipdays"];
        headers = headers.concat(this.props.labs.map((e) => e.name));
        return headers;
    }
    getResultSelector(student) {
        let selector = [student.user.firstname + " " + student.user.lastname, "5"];
        selector = selector.concat(student.course.assignments.map((e, i) => React.createElement("a", { className: "lab-result-cell", onClick: () => this.handleOnclick(e), href: "#" }, e.latest ? (e.latest.score + "%") : "N/A")));
        return selector;
    }
    handleOnclick(item) {
        this.setState({
            assignment: item,
        });
    }
    handleOnchange(query) {
        query = query.toLowerCase();
        const filteredData = [];
        this.props.students.forEach((std) => {
            if (std.user.firstname.toLowerCase().indexOf(query) !== -1
                || std.user.lastname.toLowerCase().indexOf(query) !== -1
                || std.user.email.toLowerCase().indexOf(query) !== -1) {
                filteredData.push(std);
            }
        });
        this.setState({
            students: filteredData,
        });
    }
}
exports.Results = Results;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
        };
    }
    render() {
        let addOn = null;
        if (this.props.addonBefore) {
            addOn = this.props.addonBefore;
        }
        return (React.createElement("div", { className: this.props.className ? this.props.className : "" },
            addOn,
            React.createElement("input", { className: "form-control", type: "text", placeholder: this.props.placeholder ? this.props.placeholder : "", onChange: (e) => this.onChange(e), value: this.state.query })));
    }
    onChange(e) {
        this.setState({
            query: e.target.value,
        });
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
}
exports.Search = Search;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __webpack_require__(7);
const models_1 = __webpack_require__(3);
function isUserEnrollment(enroll) {
    if (enroll.course) {
        return true;
    }
    return false;
}
exports.isUserEnrollment = isUserEnrollment;
function isCourseEnrollment(enroll) {
    if (enroll.user) {
        return true;
    }
    return false;
}
exports.isCourseEnrollment = isCourseEnrollment;
class CourseManager {
    constructor(courseProvider) {
        this.courseProvider = courseProvider;
    }
    addUserToCourse(user, course) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseProvider.addUserToCourse(user, course);
        });
    }
    getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseProvider.getCourse(id);
        });
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseProvider.getCourses();
        });
    }
    getCoursesWithState(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCourses = yield this.courseProvider.getCoursesFor(user);
            const newMap = userCourses.map((ele) => {
                return {
                    assignments: [],
                    course: ele.course,
                    link: ele.status !== undefined ?
                        { courseId: ele.courseid, userid: ele.userid, state: ele.status } : undefined,
                };
            });
            return newMap;
        });
    }
    getCoursesFor(user, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.courseProvider.getCoursesFor(user, state)).map((ele) => ele.course);
        });
    }
    getAssignment(course, assignmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = yield this.courseProvider.getAssignments(course.id);
            const assign = temp[assignmentId];
            if (assign) {
                return assign;
            }
            return null;
        });
    }
    getAssignments(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (models_1.isCourse(courseId)) {
                courseId = courseId.id;
            }
            return map_1.MapHelper.toArray(yield this.courseProvider.getAssignments(courseId));
        });
    }
    changeUserState(link, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseProvider.changeUserState(link, state);
        });
    }
    createNewCourse(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.courseProvider.createNewCourse(courseData);
        });
    }
    updateCourse(courseId, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseProvider.updateCourse(courseId, courseData);
        });
    }
    getStudentCourse(student, course) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = yield this.courseProvider.getCoursesFor(student);
            for (const crs of courses) {
                if (crs.courseid === course.id) {
                    const returnTemp = {
                        link: crs.status !== undefined ?
                            { userid: student.id, courseId: course.id, state: crs.status } : undefined,
                        assignments: [],
                        course,
                    };
                    yield this.fillLinks(student, returnTemp);
                    return returnTemp;
                }
            }
            return null;
        });
    }
    getUserSubmittions(student, assignment) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = map_1.MapHelper.find(yield this.courseProvider.getAllLabInfos(), (ele) => ele.studentId === student.id && ele.assignmentId === assignment.id);
            if (temp) {
                return {
                    assignment,
                    latest: temp,
                };
            }
            return {
                assignment,
                latest: undefined,
            };
        });
    }
    getStudentCourses(student, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const links = [];
            const userCourses = yield this.courseProvider.getCoursesFor(student, state);
            for (const course of userCourses) {
                links.push({
                    assignments: [],
                    course: course.course,
                    link: course.status !== undefined ?
                        { courseId: course.courseid, userid: student.id, state: course.status } : undefined,
                });
            }
            for (const link of links) {
                yield this.fillLinks(student, link);
            }
            return links;
        });
    }
    getUsersForCourse(course, userMan, state) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.courseProvider.getUsersForCourse(course, state)).map((user) => {
                return {
                    link: { courseId: course.id, userid: user.userid, state: user.status },
                    user: user.user,
                };
            });
        });
    }
    getDirectories(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.courseProvider.getDirectories(provider);
        });
    }
    fillLinks(student, studentCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(student, studentCourse);
            if (!studentCourse.link) {
                return;
            }
            const allSubmissions = [];
            const assigns = yield this.getAssignments(studentCourse.course.id);
            for (const assign of assigns) {
                const submission = yield this.getUserSubmittions(student, assign);
                if (submission) {
                    studentCourse.assignments.push(submission);
                }
            }
        });
    }
}
exports.CourseManager = CourseManager;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __webpack_require__(6);
const NavigationHelper_1 = __webpack_require__(2);
const ViewPage_1 = __webpack_require__(4);
function isILinkCollection(item) {
    if (item.item) {
        return true;
    }
    return false;
}
exports.isILinkCollection = isILinkCollection;
class NavigationManager {
    constructor(history) {
        this.onNavigate = event_1.newEvent("NavigationManager.onNavigate");
        this.pages = {};
        this.errorPages = [];
        this.defaultPath = "";
        this.currentPath = "";
        this.browserHistory = history;
        window.addEventListener("popstate", (e) => {
            this.navigateTo(location.pathname, true);
        });
    }
    setDefaultPath(path) {
        this.defaultPath = path;
    }
    navigateTo(path, preventPush) {
        if (path === "/") {
            this.navigateToDefault();
            return;
        }
        const parts = NavigationHelper_1.NavigationHelper.getParts(path);
        let curPage = this.pages;
        this.currentPath = parts.join("/");
        if (!preventPush) {
            this.browserHistory.pushState({}, "Autograder", "/" + this.currentPath);
        }
        for (let i = 0; i < parts.length; i++) {
            const a = parts[i];
            if (ViewPage_1.isViewPage(curPage)) {
                this.onNavigate({
                    page: curPage,
                    subPage: parts.slice(i, parts.length).join("/"),
                    target: this,
                    uri: path,
                });
                return;
            }
            else {
                const cur = curPage[a];
                if (!cur) {
                    this.onNavigate({ target: this, page: this.getErrorPage(404), subPage: "", uri: path });
                    return;
                }
                curPage = cur;
            }
        }
        if (ViewPage_1.isViewPage(curPage)) {
            this.onNavigate({ target: this, page: curPage, uri: path, subPage: "" });
            return;
        }
        else {
            this.onNavigate({ target: this, page: this.getErrorPage(404), subPage: "", uri: path });
        }
    }
    navigateToDefault() {
        this.navigateTo(this.defaultPath);
    }
    navigateToError(statusCode) {
        this.onNavigate({ target: this, page: this.getErrorPage(statusCode), subPage: "", uri: statusCode.toString() });
    }
    registerPage(path, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const parts = NavigationHelper_1.NavigationHelper.getParts(path);
            if (parts.length === 0) {
                throw Error("Can't add page to index element");
            }
            page.setPath(parts.join("/"));
            let curObj = this.pages;
            for (let i = 0; i < parts.length - 1; i++) {
                const a = parts[i];
                if (a.length === 0) {
                    continue;
                }
                let temp = curObj[a];
                if (!temp) {
                    temp = {};
                    curObj[a] = temp;
                }
                else if (!ViewPage_1.isViewPage(temp)) {
                    temp = curObj[a];
                }
                if (ViewPage_1.isViewPage(temp)) {
                    throw Error("Can't assign a IPageContainer to a ViewPage");
                }
                curObj = temp;
            }
            curObj[parts[parts.length - 1]] = page;
            yield page.init();
        });
    }
    registerErrorPage(statusCode, page) {
        this.errorPages[statusCode] = page;
    }
    checkLinks(links, viewPage) {
        let checkUrl = this.currentPath;
        if (viewPage && viewPage.pagePath === checkUrl) {
            checkUrl += "/" + viewPage.navHelper.defaultPage;
        }
        const long = NavigationHelper_1.NavigationHelper.getParts(checkUrl);
        for (const l of links) {
            if (!l.uri) {
                continue;
            }
            const short = NavigationHelper_1.NavigationHelper.getParts(l.uri);
            l.active = this.checkPartEqual(long, short);
        }
    }
    checkLinkCollection(links, viewPage) {
        let checkUrl = this.currentPath;
        if (viewPage && viewPage.pagePath === checkUrl) {
            checkUrl += "/" + viewPage.navHelper.defaultPage;
        }
        const long = NavigationHelper_1.NavigationHelper.getParts(checkUrl);
        for (const l of links) {
            if (!l.item.uri) {
                continue;
            }
            const short = NavigationHelper_1.NavigationHelper.getParts(l.item.uri);
            l.item.active = this.checkPartEqual(long, short);
            if (l.children) {
                this.checkLinks(l.children, viewPage);
            }
        }
    }
    refresh() {
        this.navigateTo(this.currentPath);
    }
    checkPartEqual(long, short) {
        if (short.length > long.length) {
            return false;
        }
        for (let i = 0; i < short.length; i++) {
            if (short[i] !== long[i]) {
                return false;
            }
        }
        return true;
    }
    getErrorPage(statusCode) {
        if (this.errorPages[statusCode]) {
            return this.errorPages[statusCode];
        }
        throw Error("Status page: " + statusCode + " is not defined");
    }
}
exports.NavigationManager = NavigationManager;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models = __webpack_require__(3);
const models_1 = __webpack_require__(3);
const map_1 = __webpack_require__(7);
class TempDataProvider {
    constructor() {
        this.currentLoggedIn = null;
        this.addLocalAssignments();
        this.addLocalCourses();
        this.addLocalCourseStudent();
        this.addLocalUsers();
        this.addLocalLabInfo();
    }
    getDirectories(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return map_1.MapHelper.toArray(this.localUsers);
        });
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            return map_1.MapHelper.toArray(this.localCourses);
        });
    }
    getCoursesStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.localCourseStudent;
        });
    }
    getAssignments(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = [];
            map_1.MapHelper.forEach(this.localAssignments, (a, i) => {
                if (a.courseid === courseId) {
                    temp[i] = a;
                }
            });
            return temp;
        });
    }
    tryLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = map_1.MapHelper.find(this.localUsers, (u) => u.email.toLocaleLowerCase() === username.toLocaleLowerCase());
            if (user && user.password === password) {
                this.currentLoggedIn = user;
                return user;
            }
            return null;
        });
    }
    tryRemoteLogin(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let lookup = "test@testersen.no";
            if (provider === "gitlab") {
                lookup = "bob@bobsen.no";
            }
            const user = map_1.MapHelper.find(this.localUsers, (u) => u.email.toLocaleLowerCase() === lookup);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.currentLoggedIn = user;
                    resolve(user);
                }, 500);
            });
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    addUserToCourse(user, course) {
        return __awaiter(this, void 0, void 0, function* () {
            this.localCourseStudent.push({
                courseId: course.id,
                userid: user.id,
                state: Models.CourseUserState.pending,
            });
            return true;
        });
    }
    getUserLinksForCourse(course, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = [];
            for (const c of yield this.getCoursesStudent()) {
                if (course.id === c.courseId && (state === undefined || c.state === models_1.CourseUserState.student)) {
                    users.push(c);
                }
            }
            return users;
        });
    }
    getUsersAsMap(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const returnUsers = {};
            const allUsers = yield this.getAllUser();
            ids.forEach((ele) => {
                const temp = allUsers[ele];
                if (temp) {
                    returnUsers[ele] = temp;
                }
            });
            return returnUsers;
        });
    }
    getUsersForCourse(course, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseStds = yield this.getUserLinksForCourse(course, state);
            const users = yield this.getUsersAsMap(courseStds.map((e) => e.userid));
            return courseStds.map((link) => {
                const user = users[link.userid];
                if (!user) {
                    throw new Error("Link exist witout a user object");
                }
                return { courseid: link.courseId, userid: link.userid, user, status: link.state };
            });
        });
    }
    createNewCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            const courses = map_1.MapHelper.toArray(this.localCourses);
            course.id = courses.length;
            const courseData = course;
            courses.push(courseData);
            this.localCourses = map_1.mapify(courses, (ele) => ele.id);
            return true;
        });
    }
    getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = this.localCourses[id];
            if (course) {
                return course;
            }
            return null;
        });
    }
    updateCourse(courseId, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = this.localCourses[courseId];
            if (course) {
                this.localCourses[courseData.id] = courseData;
                return true;
            }
            return false;
        });
    }
    changeUserState(link, state) {
        return __awaiter(this, void 0, void 0, function* () {
            link.state = state;
            return true;
        });
    }
    changeAdminRole(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.isadmin = !user.isadmin;
            return true;
        });
    }
    getAllLabInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.localLabInfo;
        });
    }
    getLoggedInUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.currentLoggedIn;
        });
    }
    getCoursesFor(user, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const cLinks = [];
            const temp = yield this.getCoursesStudent();
            for (const c of temp) {
                if (user.id === c.userid && (state === undefined || c.state === models_1.CourseUserState.student)) {
                    cLinks.push(c);
                }
            }
            const courses = [];
            const tempCourses = yield this.getCourses();
            for (const link of cLinks) {
                const c = tempCourses[link.courseId];
                if (c) {
                    courses.push({ course: c, courseid: link.courseId, userid: link.userid, status: link.state });
                }
            }
            return courses;
        });
    }
    addLocalUsers() {
        this.localUsers = map_1.mapify([
            {
                id: 999,
                firstname: "Test",
                lastname: "Testersen",
                email: "test@testersen.no",
                personid: 9999,
                password: "1234",
                isadmin: true,
            },
            {
                id: 1000,
                firstname: "Admin",
                lastname: "Admin",
                email: "admin@admin",
                personid: 1000,
                password: "1234",
                isadmin: true,
            },
            {
                id: 1,
                firstname: "Per",
                lastname: "Pettersen",
                email: "per@pettersen.no",
                personid: 1234,
                password: "1234",
                isadmin: false,
            },
            {
                id: 2,
                firstname: "Bob",
                lastname: "Bobsen",
                email: "bob@bobsen.no",
                personid: 1234,
                password: "1234",
                isadmin: false,
            },
            {
                id: 3,
                firstname: "Petter",
                lastname: "Pan",
                email: "petter@pan.no",
                personid: 1234,
                password: "1234",
                isadmin: false,
            },
        ], (ele) => ele.id);
    }
    addLocalAssignments() {
        this.localAssignments = map_1.mapify([
            {
                id: 0,
                courseid: 0,
                name: "Lab 1",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 1,
                courseid: 0,
                name: "Lab 2",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 2,
                courseid: 0,
                name: "Lab 3",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 3,
                courseid: 0,
                name: "Lab 4",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 4,
                courseid: 1,
                name: "Lab 1",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 5,
                courseid: 1,
                name: "Lab 2",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 6,
                courseid: 1,
                name: "Lab 3",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 7,
                courseid: 2,
                name: "Lab 1",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 8,
                courseid: 2,
                name: "Lab 2",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 9,
                courseid: 3,
                name: "Lab 1",
                deadline: new Date(2017, 5, 25),
            },
            {
                id: 10,
                courseid: 4,
                name: "Lab 1",
                deadline: new Date(2017, 5, 25),
            },
        ], (ele) => ele.id);
    }
    addLocalCourses() {
        this.localCourses = map_1.mapify([
            {
                id: 0,
                name: "Object Oriented Programming",
                code: "DAT100",
                tag: "Spring",
                year: 2017,
                provider: "github",
                directoryid: 23650610,
            },
            {
                id: 1,
                name: "Algorithms and Datastructures",
                code: "DAT200",
                tag: "Spring",
                year: 2017,
                provider: "github",
                directoryid: 23650611,
            },
            {
                id: 2,
                name: "Databases",
                code: "DAT220",
                tag: "Spring",
                year: 2017,
                provider: "github",
                directoryid: 23650612,
            },
            {
                id: 3,
                name: "Communication Technology",
                code: "DAT230",
                tag: "Spring",
                year: 2017,
                provider: "github",
                directoryid: 23650613,
            },
            {
                id: 4,
                name: "Operating Systems",
                code: "DAT320",
                tag: "Spring",
                year: 2017,
                provider: "github",
                directoryid: 23650614,
            },
        ], (ele) => ele.id);
    }
    addLocalCourseStudent() {
        this.localCourseStudent = [
            { courseId: 0, userid: 999, state: 2 },
            { courseId: 1, userid: 999, state: 2 },
            { courseId: 0, userid: 1, state: 0 },
            { courseId: 0, userid: 2, state: 0 },
        ];
    }
    addLocalLabInfo() {
        this.localLabInfo = map_1.mapify([
            {
                id: 1,
                assignmentId: 0,
                studentId: 999,
                buildId: 1,
                buildDate: new Date(2017, 6, 4),
                buildLog: "Build log for build 1",
                executetionTime: 1,
                score: 75,
                weight: 1,
                failedTests: 2,
                passedTests: 6,
                testCases: [
                    { name: "Test 1", score: 2, points: 2, weight: 20 },
                    { name: "Test 2", score: 1, points: 3, weight: 40 },
                    { name: "Test 3", score: 3, points: 3, weight: 40 },
                ],
            },
            {
                id: 2,
                assignmentId: 1,
                studentId: 999,
                buildId: 2,
                buildDate: new Date(2017, 6, 4),
                buildLog: "Build log for build 2",
                executetionTime: 1,
                score: 75,
                weight: 1,
                failedTests: 2,
                passedTests: 6,
                testCases: [
                    { name: "Test 1", score: 2, points: 2, weight: 20 },
                    { name: "Test 2", score: 1, points: 3, weight: 40 },
                    { name: "Test 3", score: 3, points: 3, weight: 40 },
                ],
            },
            {
                id: 3,
                assignmentId: 2,
                studentId: 999,
                buildId: 3,
                buildDate: new Date(2017, 6, 4),
                buildLog: "Build log for build 3",
                executetionTime: 1,
                score: 75,
                weight: 1,
                failedTests: 2,
                passedTests: 6,
                testCases: [
                    { name: "Test 1", score: 2, points: 2, weight: 20 },
                    { name: "Test 2", score: 1, points: 3, weight: 40 },
                    { name: "Test 3", score: 3, points: 3, weight: 40 },
                ],
            },
            {
                id: 4,
                assignmentId: 3,
                studentId: 999,
                buildId: 4,
                buildDate: new Date(2017, 6, 4),
                buildLog: "Build log for build 4",
                executetionTime: 1,
                score: 75,
                weight: 1,
                failedTests: 2,
                passedTests: 6,
                testCases: [
                    { name: "Test 1", score: 2, points: 2, weight: 20 },
                    { name: "Test 2", score: 1, points: 3, weight: 40 },
                    { name: "Test 3", score: 3, points: 3, weight: 40 },
                ],
            },
            {
                id: 5,
                assignmentId: 4,
                studentId: 999,
                buildId: 5,
                buildDate: new Date(2017, 6, 4),
                buildLog: "Build log for build 5",
                executetionTime: 1,
                score: 75,
                weight: 1,
                failedTests: 2,
                passedTests: 6,
                testCases: [
                    { name: "Test 1", score: 2, points: 2, weight: 20 },
                    { name: "Test 2", score: 1, points: 3, weight: 40 },
                    { name: "Test 3", score: 3, points: 3, weight: 40 },
                ],
            },
        ], (ele) => {
            return ele.id;
        });
    }
    getLocalDirectories() {
        return ([
            {
                id: 23650610,
                path: "dat520-2017",
                avatar: "https://avatars2.githubusercontent.com/u/23650610?v=3",
            },
        ]);
    }
}
exports.TempDataProvider = TempDataProvider;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __webpack_require__(6);
class UserManager {
    constructor(userProvider) {
        this.onLogin = event_1.newEvent("UserManager.onLogin");
        this.onLogout = event_1.newEvent("UserManager.onLogout");
        this.userProvider = userProvider;
    }
    getCurrentUser() {
        return this.currentUser;
    }
    tryLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userProvider.tryLogin(username, password);
            if (result) {
                this.currentUser = result;
                this.onLogin({ target: this, user: this.currentUser });
            }
            return result;
        });
    }
    tryRemoteLogin(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userProvider.tryRemoteLogin(provider);
            if (result) {
                this.currentUser = result;
                this.onLogin({ target: this, user: this.currentUser });
            }
            return result;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentUser) {
                yield this.userProvider.logout(this.currentUser);
                this.currentUser = null;
                this.onLogout({ target: this });
            }
        });
    }
    isAdmin(user) {
        return user.isadmin;
    }
    isTeacher(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return user.isadmin;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userProvider.getAllUser();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented error");
        });
    }
    changeAdminRole(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userProvider.changeAdminRole(user);
        });
    }
    checkUserLoggedIn() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userProvider.getLoggedInUser();
            this.currentUser = user;
            if (user) {
                return true;
            }
            return false;
        });
    }
}
exports.UserManager = UserManager;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ViewPage_1 = __webpack_require__(4);
class ErrorPage extends ViewPage_1.ViewPage {
    constructor() {
        super();
        this.pages = {};
        this.navHelper.defaultPage = "404";
        this.navHelper.registerFunction("404", (navInfo) => __awaiter(this, void 0, void 0, function* () {
            return React.createElement("div", null,
                React.createElement("h1", null, "404 Page not found"),
                React.createElement("p", null, "The page you where looking for does not exist"));
        }));
    }
    renderContent(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let content = yield this.navHelper.navigateTo(page);
            if (!content) {
                content = yield this.navHelper.navigateTo("404");
            }
            if (!content) {
                throw new Error("There is a problem with the navigation");
            }
            return content;
        });
    }
}
exports.ErrorPage = ErrorPage;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ViewPage_1 = __webpack_require__(4);
const HelpView_1 = __webpack_require__(39);
class HelpPage extends ViewPage_1.ViewPage {
    constructor(navMan) {
        super();
        this.pages = {};
        this.navMan = navMan;
        this.navHelper.defaultPage = "help";
        this.navHelper.registerFunction("help", this.help);
    }
    help(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return React.createElement(HelpView_1.HelpView, null);
        });
    }
}
exports.HelpPage = HelpPage;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class HelpView extends React.Component {
    render() {
        return (React.createElement(components_1.Row, { className: "container-fluid" },
            React.createElement("div", { className: "col-md-2 col-sm-3 col-xs-12" },
                React.createElement("div", { className: "list-group" },
                    React.createElement("a", { href: "#", className: "list-group-item disabled" }, "Help"),
                    React.createElement("a", { href: "#autograder", className: "list-group-item" }, "Autograder"),
                    React.createElement("a", { href: "#reg", className: "list-group-item" }, "Registration"),
                    React.createElement("a", { href: "#signup", className: "list-group-item" }, "Sign up for a course"))),
            React.createElement("div", { className: "col-md-8 col-sm-9 col-xs-12" },
                React.createElement("article", null,
                    React.createElement("h1", { id: "autograder" }, "Autograder"),
                    React.createElement("p", null, "Autograder is a new tool for students and teaching staff for submitting and validating lab assignments and is developed at the University of Stavanger. All lab submissions from students are handled using Git, a source code management system, and GitHub, a web-based hosting service for Git source repositories."),
                    React.createElement("p", null, "Students push their updated lab submissions to GitHub. Every lab submission is then processed by a custom continuous integration tool. This tool will run several test cases on the submitted code. Autograder generates feedback that let the students verify if their submission implements the required functionality. This feedback is available through a web interface. The feedback from the Autograder system can be used by students to improve their submissions."),
                    React.createElement("p", null, "Below is a step-by-step explanation of how to register and sign up for the lab project in Autograder."),
                    React.createElement("h1", { id: "reg" }, "Registration"),
                    React.createElement("ol", null,
                        React.createElement("li", null,
                            React.createElement("p", null,
                                "Go to ",
                                React.createElement("a", { href: "http://github.com" }, "GitHub"),
                                " and register. A GitHub account is required to sign in to Autograder. You can skip this step if you already have an account.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Click the \"Sign in with GitHub\" button to register. You will then be taken to GitHub's website.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Approve that our Autograder application may have permission to access to the requested parts of your account. It is possible to make a separate GitHub account for system if you do not want Autograder to access your personal one with the requested permissions."))),
                    React.createElement("h1", { id: "signup" }, "Signing up for a course"),
                    React.createElement("ol", null,
                        React.createElement("li", null,
                            React.createElement("p", null, "Click the course menu item.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "In the course menu click on \u201CNew Course\u201D. Available courses will be listed.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Find the course you are signing up for and click sign up.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Read through and accept the terms. You will then be invited to the course organization on GitHub.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "An invitation will be sent to your email address registered with GitHub account. Accept the invitation using the received email.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Wait for the teaching staff to verify your Autograder-registration.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "You will get your own repository in the organization \"uis-dat520\" on GitHub after your registration is verified. You will also have access to the feedback pages for this course on Autograder.")))))));
    }
}
exports.HelpView = HelpView;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ViewPage_1 = __webpack_require__(4);
class HomePage extends ViewPage_1.ViewPage {
    constructor() {
        super();
    }
    renderContent(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return React.createElement("h1", null, "Welcome to autograder");
        });
    }
}
exports.HomePage = HomePage;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
const models_1 = __webpack_require__(3);
const ViewPage_1 = __webpack_require__(4);
const HelloView_1 = __webpack_require__(42);
const UserView_1 = __webpack_require__(5);
const CollapsableNavMenu_1 = __webpack_require__(12);
const EnrollmentView_1 = __webpack_require__(43);
class StudentPage extends ViewPage_1.ViewPage {
    constructor(users, navMan, courseMan) {
        super();
        this.courses = [];
        this.activeCourses = [];
        this.navMan = navMan;
        this.userMan = users;
        this.courseMan = courseMan;
        this.navHelper.defaultPage = "index";
        this.navHelper.checkAuthentication = () => this.checkAuthentication();
        this.navHelper.registerFunction("index", this.index);
        this.navHelper.registerFunction("course/{courseid:number}", this.course);
        this.navHelper.registerFunction("course/{courseid:number}/lab/{labid:number}", this.courseWithLab);
        this.navHelper.registerFunction("course/{courseid:number}/members", this.members);
        this.navHelper.registerFunction("course/{courseid:number}/{page}", this.courseMissing);
        this.navHelper.registerFunction("enroll", this.enroll);
        this.navHelper.registerFunction("user", this.getUsers);
        this.navHelper.registerFunction("hello", (navInfo) => Promise.resolve(React.createElement(HelloView_1.HelloView, null)));
    }
    checkAuthentication() {
        const curUser = this.userMan.getCurrentUser();
        if (curUser) {
            return true;
        }
        return false;
    }
    getUsers(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            const users = yield this.userMan.getAllUser();
            return React.createElement(UserView_1.UserView, { users: users });
        });
    }
    index(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            if (this.activeCourses) {
                console.log(this.activeCourses);
                return (React.createElement(components_1.CoursesOverview, { courseOverview: this.activeCourses, navMan: this.navMan }));
            }
            return React.createElement("h1", null, "404");
        });
    }
    enroll(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            const curUser = this.userMan.getCurrentUser();
            if (!curUser) {
                return React.createElement("h1", null, "404");
            }
            return React.createElement("div", null,
                React.createElement("h1", null, "Enrollment page"),
                React.createElement(EnrollmentView_1.EnrollmentView, { courses: yield this.courseMan.getCoursesWithState(curUser), onEnrollmentClick: (course) => {
                        this.courseMan.addUserToCourse(curUser, course);
                        this.navMan.refresh();
                    } }));
        });
    }
    course(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            this.selectCourse(navInfo.params.courseid);
            if (this.selectedCourse) {
                return (React.createElement(components_1.SingleCourseOverview, { courseAndLabs: this.selectedCourse, onLabClick: (courseId, labId) => this.handleLabClick(courseId, labId) }));
            }
            return React.createElement("h1", null, "404 not found");
        });
    }
    courseWithLab(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            this.selectCourse(navInfo.params.courseid);
            console.log("Course with lab", this.selectedCourse);
            if (this.selectedCourse) {
                yield this.selectAssignment(navInfo.params.labid);
                if (this.selectedAssignment) {
                    console.log("selected!");
                    return React.createElement(components_1.StudentLab, { course: this.selectedCourse.course, assignment: this.selectedAssignment });
                }
            }
            return React.createElement("div", null, "404 not found");
        });
    }
    members(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupData();
            const courseId = navInfo.params.courseid;
            const course = yield this.courseMan.getCourse(courseId);
            if (course) {
                const students = yield this.courseMan.getUsersForCourse(course, this.userMan, [models_1.CourseUserState.student]);
                return React.createElement(components_1.GroupForm, { className: "form-horizontal", students: students, capacity: 2 });
            }
            return React.createElement("div", null, "404 not found");
        });
    }
    courseMissing(navInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return React.createElement("div", null,
                "The page ",
                navInfo.params.page,
                " is not yet implemented");
        });
    }
    renderMenu(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key === 0) {
                const coursesLinks = this.activeCourses.map((course, i) => {
                    const allLinks = [];
                    allLinks.push({ name: "Labs" });
                    const labs = course.assignments;
                    allLinks.push(...labs.map((lab, ind) => {
                        return {
                            name: lab.assignment.name,
                            uri: this.pagePath + "/course/" + course.course.id + "/lab/" + lab.assignment.id,
                        };
                    }));
                    allLinks.push({ name: "Group Labs" });
                    allLinks.push({ name: "Settings" });
                    allLinks.push({
                        name: "Members", uri: this.pagePath + "/course/" + course.course.id + "/members",
                    });
                    allLinks.push({
                        name: "Coruse Info", uri: this.pagePath + "/course/" + course.course.id + "/info",
                    });
                    return {
                        item: { name: course.course.code, uri: this.pagePath + "/course/" + course.course.id },
                        children: allLinks,
                    };
                });
                const settings = [
                    { name: "Join course", uri: this.pagePath + "/enroll" },
                ];
                this.navMan.checkLinkCollection(coursesLinks, this);
                this.navMan.checkLinks(settings, this);
                return [
                    React.createElement("h4", { key: 0 }, "Courses"),
                    React.createElement(CollapsableNavMenu_1.CollapsableNavMenu, { key: 1, links: coursesLinks, onClick: (link) => this.handleClick(link) }),
                    React.createElement("h4", { key: 2 }, "Settings"),
                    React.createElement(components_1.NavMenu, { key: 3, links: settings, onClick: (link) => this.handleClick(link) }),
                ];
            }
            return [];
        });
    }
    onlyActiveCourses(studentCourse) {
        const temp = [];
        studentCourse.forEach((a) => {
            if (a.link && a.link.state === models_1.CourseUserState.student) {
                temp.push(a);
            }
        });
        return temp;
    }
    setupData() {
        return __awaiter(this, void 0, void 0, function* () {
            const curUser = this.userMan.getCurrentUser();
            if (curUser) {
                this.courses = yield this.courseMan.getStudentCourses(curUser, [models_1.CourseUserState.student]);
                this.activeCourses = this.onlyActiveCourses(this.courses);
            }
        });
    }
    selectCourse(course) {
        this.selectedCourse = undefined;
        this.selectedCourse = this.activeCourses.find((e) => e.course.id === course);
    }
    selectAssignment(labId) {
        if (this.selectedCourse) {
            this.selectedAssignment = this.selectedCourse.assignments.find((e) => e.assignment.id === labId);
        }
    }
    handleClick(link) {
        if (link.uri) {
            this.navMan.navigateTo(link.uri);
        }
    }
    handleLabClick(courseId, labId) {
        this.navMan.navigateTo(this.pagePath + "/course/" + courseId + "/lab/" + labId);
    }
}
exports.StudentPage = StudentPage;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
class HelloView extends React.Component {
    render() {
        return React.createElement("h1", null, "Hello world");
    }
}
exports.HelloView = HelloView;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
const models_1 = __webpack_require__(3);
class EnrollmentView extends React.Component {
    render() {
        return React.createElement(components_1.DynamicTable, { data: this.props.courses, header: ["Course code", "Course Name", "Action"], selector: (course) => this.createEnrollmentRow(this.props.courses, course) });
    }
    createEnrollmentRow(studentCourses, course) {
        const base = [course.course.code, course.course.name];
        if (course.link) {
            if (course.link.state === models_1.CourseUserState.student) {
                base.push("Enrolled");
            }
            else if (course.link.state === models_1.CourseUserState.pending) {
                base.push("Pending");
            }
            else {
                base.push(React.createElement("span", { style: { padding: "7px", verticalAlign: "middle" }, className: "bg-danger" }, "Rejected"));
            }
        }
        else {
            base.push(React.createElement("button", { onClick: () => { this.props.onEnrollmentClick(course.course); }, className: "btn btn-primary" }, "Enroll"));
        }
        return base;
    }
}
exports.EnrollmentView = EnrollmentView;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
const ViewPage_1 = __webpack_require__(4);
const UserView_1 = __webpack_require__(5);
const CollapsableNavMenu_1 = __webpack_require__(12);
const models_1 = __webpack_require__(3);
const MemberView_1 = __webpack_require__(45);
class TeacherPage extends ViewPage_1.ViewPage {
    constructor(userMan, navMan, courseMan) {
        super();
        this.courses = [];
        this.pages = {};
        this.navMan = navMan;
        this.userMan = userMan;
        this.courseMan = courseMan;
        this.navHelper.defaultPage = "course";
        this.navHelper.checkAuthentication = () => this.checkAuthentication();
        this.navHelper.registerFunction("course/{course}", this.course);
        this.navHelper.registerFunction("course/{course}/members", this.courseUsers);
        this.navHelper.registerFunction("course/{course}/results", this.results);
        this.navHelper.registerFunction("course/{course}/{page}", this.course);
        this.navHelper.registerFunction("user", (navInfo) => __awaiter(this, void 0, void 0, function* () {
            return React.createElement(UserView_1.UserView, { users: yield userMan.getAllUser() });
        }));
    }
    checkAuthentication() {
        this.curUser = this.userMan.getCurrentUser();
        if (this.curUser && this.userMan.isTeacher(this.curUser)) {
            return true;
        }
        this.curUser = null;
        return false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.courses = yield this.getCourses();
            this.navHelper.defaultPage = "course/" + (this.courses.length > 0 ? this.courses[0].id.toString() : "");
        });
    }
    course(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = parseInt(info.params.course, 10);
            const course = yield this.courseMan.getCourse(courseId);
            if (course) {
                if (info.params.page) {
                    return React.createElement("h3", null,
                        "You are know on page ",
                        info.params.page.toUpperCase(),
                        " in course ",
                        info.params.course);
                }
                return React.createElement("h1", null,
                    "Teacher Course ",
                    info.params.course);
            }
            return React.createElement("div", null, "404 Page not found");
        });
    }
    results(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = parseInt(info.params.course, 10);
            const course = yield this.courseMan.getCourse(courseId);
            if (course) {
                const students = yield this.courseMan.getUsersForCourse(course, this.userMan, [models_1.CourseUserState.student]);
                const linkedStudents = [];
                for (const student of students) {
                    const temp = yield this.courseMan.getStudentCourse(student.user, course);
                    if (temp) {
                        linkedStudents.push({ course: temp, user: student.user });
                    }
                }
                const labs = yield this.courseMan.getAssignments(courseId);
                return React.createElement(components_1.Results, { course: course, labs: labs, students: linkedStudents });
            }
            return React.createElement("div", null, "404 Page not found");
        });
    }
    courseUsers(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = parseInt(info.params.course, 10);
            const course = yield this.courseMan.getCourse(courseId);
            if (course) {
                const all = yield this.courseMan.getUsersForCourse(course, this.userMan);
                const acceptedUsers = [];
                const pendingUsers = [];
                all.forEach((user, id) => {
                    switch (user.link.state) {
                        case models_1.CourseUserState.teacher:
                        case models_1.CourseUserState.student:
                            acceptedUsers.push(user);
                            break;
                        case models_1.CourseUserState.pending:
                            pendingUsers.push(user);
                            break;
                    }
                });
                return React.createElement(MemberView_1.MemberView, { acceptedUsers: acceptedUsers, course: course, navMan: this.navMan, pendingUsers: pendingUsers, courseMan: this.courseMan });
            }
            return React.createElement("div", null, "404 Page not found");
        });
    }
    generateCollectionFor(link) {
        return {
            item: link,
            children: [
                { name: "Results", uri: link.uri + "/results" },
                { name: "Groups", uri: link.uri + "/groups" },
                { name: "Members", uri: link.uri + "/members" },
            ],
        };
    }
    renderMenu(menu) {
        return __awaiter(this, void 0, void 0, function* () {
            const curUser = this.userMan.getCurrentUser();
            if (curUser) {
                if (menu === 0) {
                    const states = [models_1.CourseUserState.teacher];
                    if (this.userMan.isAdmin(curUser)) {
                        states.push(models_1.CourseUserState.pending);
                    }
                    const courses = yield this.courseMan.getCoursesFor(curUser, states);
                    const labLinks = [];
                    courses.forEach((e) => {
                        labLinks.push(this.generateCollectionFor({
                            name: e.code,
                            uri: this.pagePath + "/course/" + e.id,
                        }));
                    });
                    const settings = [];
                    this.navMan.checkLinkCollection(labLinks, this);
                    this.navMan.checkLinks(settings, this);
                    return [
                        React.createElement("h4", { key: 0 }, "Courses"),
                        React.createElement(CollapsableNavMenu_1.CollapsableNavMenu, { key: 1, links: labLinks, onClick: (link) => this.handleClick(link) }),
                        React.createElement("h4", { key: 2 }, "Settings"),
                        React.createElement(components_1.NavMenu, { key: 3, links: settings, onClick: (link) => this.handleClick(link) }),
                    ];
                }
            }
            return [];
        });
    }
    handleClick(link) {
        if (link.uri) {
            this.navMan.navigateTo(link.uri);
        }
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const curUsr = this.userMan.getCurrentUser();
            if (curUsr) {
                return yield this.courseMan.getCoursesFor(curUsr);
            }
            return [];
        });
    }
}
exports.TeacherPage = TeacherPage;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const models_1 = __webpack_require__(3);
const components_1 = __webpack_require__(1);
const UserView_1 = __webpack_require__(5);
exports.UserView = UserView_1.UserView;
class MemberView extends React.Component {
    render() {
        let condPending;
        if (this.props.pendingUsers.length > 0) {
            condPending = React.createElement("div", null,
                React.createElement("h3", null, "Pending users"),
                this.createPendingTable(this.props.pendingUsers));
        }
        const userView = React.createElement("div", null,
            React.createElement("h3", null, "Registered users"),
            React.createElement(UserView_1.UserView, { users: this.props.acceptedUsers.map((userRel) => userRel.user) }));
        return React.createElement("div", null,
            React.createElement("h1", null, this.props.course.name),
            userView,
            condPending);
    }
    createPendingTable(pendingUsers) {
        return React.createElement(components_1.DynamicTable, { data: pendingUsers, header: ["Name", "Email", "Student ID", "Action"], selector: (userRel) => [
                userRel.user.firstname + " " + userRel.user.lastname,
                React.createElement("a", { href: "mailto:" + userRel.user.email }, userRel.user.email),
                userRel.user.personid.toString(),
                React.createElement("span", null,
                    React.createElement("button", { onClick: (e) => {
                            this.props.courseMan.changeUserState(userRel.link, models_1.CourseUserState.student);
                            this.props.navMan.refresh();
                        }, className: "btn btn-primary" }, "Accept"),
                    React.createElement("button", { onClick: (e) => {
                            this.props.courseMan.changeUserState(userRel.link, models_1.CourseUserState.rejected);
                            this.props.navMan.refresh();
                        }, className: "btn btn-danger" }, "Reject")),
            ] });
    }
}
exports.MemberView = MemberView;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
const ViewPage_1 = __webpack_require__(4);
const CourseView_1 = __webpack_require__(47);
const UserView_1 = __webpack_require__(5);
class AdminPage extends ViewPage_1.ViewPage {
    constructor(navMan, userMan, courseMan) {
        super();
        this.navMan = navMan;
        this.userMan = userMan;
        this.courseMan = courseMan;
        this.flashMessages = null;
        this.navHelper.defaultPage = "users";
        this.navHelper.registerFunction("users", this.users);
        this.navHelper.registerFunction("courses", this.courses);
        this.navHelper.registerFunction("labs", this.labs);
        this.navHelper.registerFunction("courses/new", this.newCourse);
        this.navHelper.registerFunction("courses/{id}/edit", this.editCourse);
    }
    users(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield this.userMan.getAllUser();
            return React.createElement("div", null,
                React.createElement("h1", null, "All Users"),
                React.createElement(UserView_1.UserView, { users: allUsers, userMan: this.userMan, navMan: this.navMan, addSearchOption: true }));
        });
    }
    courses(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCourses = yield this.courseMan.getCourses();
            return React.createElement("div", null,
                React.createElement(components_1.Button, { className: "btn btn-primary pull-right", text: "+Create New", onClick: () => this.handleNewCourse() }),
                React.createElement("h1", null, "All Courses"),
                React.createElement(CourseView_1.CourseView, { courses: allCourses, onEditClick: (id) => this.handleEditCourseClick(id) }));
        });
    }
    labs(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCourses = yield this.courseMan.getCourses();
            const tables = [];
            for (let i = 0; i < allCourses.length; i++) {
                const e = allCourses[i];
                const labs = yield this.courseMan.getAssignments(e);
                tables.push(React.createElement("div", { key: i },
                    React.createElement("h3", null,
                        "Labs for ",
                        e.name,
                        " (",
                        e.code,
                        ")"),
                    React.createElement(components_1.DynamicTable, { header: ["ID", "Name", "Deadline"], data: labs, selector: (lab) => [
                            lab.id.toString(),
                            lab.name,
                            lab.deadline.toDateString(),
                        ] })));
            }
            return React.createElement("div", null, tables);
        });
    }
    newCourse(info) {
        return __awaiter(this, void 0, void 0, function* () {
            let flashHolder = React.createElement("div", null);
            if (this.flashMessages) {
                const errors = [];
                for (let i = 0; i < this.flashMessages.length; i++) {
                    errors.push(React.createElement("li", { key: i }, this.flashMessages[i]));
                }
                flashHolder = React.createElement("div", { className: "alert alert-danger" },
                    React.createElement("h4", null,
                        errors.length,
                        " errors prohibited Course from being saved: "),
                    React.createElement("ul", null, errors));
            }
            return (React.createElement("div", null,
                flashHolder,
                React.createElement(components_1.CourseForm, { className: "form-horizontal", courseMan: this.courseMan, onSubmit: (formData, errors) => this.createNewCourse(formData, errors) })));
        });
    }
    editCourse(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = parseInt(info.params.id, 10);
            const course = yield this.courseMan.getCourse(courseId);
            if (course) {
                let flashHolder = React.createElement("div", null);
                if (this.flashMessages) {
                    const errors = [];
                    for (let i = 0; i < this.flashMessages.length; i++) {
                        errors.push(React.createElement("li", { key: i }, this.flashMessages[i]));
                    }
                    flashHolder = React.createElement("div", { className: "alert alert-danger" },
                        React.createElement("h4", null,
                            errors.length,
                            " errors prohibited Course from being saved: "),
                        React.createElement("ul", null, errors));
                }
                return (React.createElement("div", null,
                    flashHolder,
                    React.createElement(components_1.CourseForm, { className: "form-horizontal", courseMan: this.courseMan, onSubmit: (formData, errors) => this.updateCourse(courseId, formData, errors), courseData: course })));
            }
            return React.createElement("h1", null, "Page not found");
        });
    }
    renderMenu(index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (index === 0) {
                const links = [
                    { name: "Users", uri: this.pagePath + "/users" },
                    { name: "Courses", uri: this.pagePath + "/courses" },
                    { name: "Labs", uri: this.pagePath + "/labs" },
                ];
                this.navMan.checkLinks(links, this);
                return [
                    React.createElement("h4", { key: 0 }, "Admin Menu"),
                    React.createElement(components_1.NavMenu, { key: 1, links: links, onClick: (e) => {
                            if (e.uri) {
                                this.navMan.navigateTo(e.uri);
                            }
                        } }),
                ];
            }
            return [];
        });
    }
    handleNewCourse(flashMessage) {
        if (flashMessage) {
            this.flashMessages = flashMessage;
        }
        this.navMan.navigateTo(this.pagePath + "/courses/new");
    }
    createNewCourse(fd, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (errors.length === 0) {
                const a = yield this.courseMan.createNewCourse(fd);
                if (!a) {
                    console.log("Failed to create course");
                }
                this.flashMessages = null;
                this.navMan.navigateTo(this.pagePath + "/courses");
            }
            else {
                this.handleNewCourse(errors);
            }
        });
    }
    handleEditCourseClick(id) {
        this.navMan.navigateTo(this.pagePath + "/courses/" + id + "/edit");
    }
    updateCourse(courseId, data, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            if (errors.length === 0) {
                yield this.courseMan.updateCourse(courseId, data);
                this.flashMessages = null;
                this.navMan.navigateTo(this.pagePath + "/courses");
            }
            else {
                this.flashMessages = errors;
                this.navMan.navigateTo(this.pagePath + "/courses/" + courseId + "/edit");
            }
        });
    }
}
exports.AdminPage = AdminPage;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const components_1 = __webpack_require__(1);
class CourseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: this.props.courses,
        };
    }
    render() {
        const searchIcon = React.createElement("span", { className: "input-group-addon" },
            React.createElement("i", { className: "glyphicon glyphicon-search" }));
        return (React.createElement("div", null,
            React.createElement(components_1.Search, { className: "input-group", addonBefore: searchIcon, placeholder: "Search for courses", onChange: (query) => this.handleSearch(query) }),
            React.createElement(components_1.DynamicTable, { header: ["ID", "Name", "Course Code", "Year", "Semester", "Action"], data: this.state.courses, selector: (e) => [e.id.toString(), e.name, e.code, e.year.toString(), e.tag,
                    React.createElement("span", null,
                        React.createElement("button", { className: "btn btn-primary", onClick: () => this.props.onEditClick(e.id) }, "Edit")),
                ] })));
    }
    handleSearch(query) {
        query = query.toLowerCase();
        const filteredData = [];
        this.props.courses.forEach((course) => {
            if (course.name.toLowerCase().indexOf(query) !== -1
                || course.code.toLowerCase().indexOf(query) !== -1
                || course.year.toString().indexOf(query) !== -1) {
                filteredData.push(course);
            }
        });
        this.setState({
            courses: filteredData,
        });
    }
}
exports.CourseView = CourseView;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavMenu_1 = __webpack_require__(9);
class NavBarLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            loginOpen: false,
        };
    }
    render() {
        if (this.props.user) {
            return React.createElement("div", { className: "navbar-right" },
                React.createElement("button", { className: "btn btn-primary navbar-btn", onClick: () => { this.handleClick({ name: "Logout", uri: "app/login/logout" }); } }, "Log out"));
        }
        let links = this.props.links;
        if (!links) {
            links = [
                { name: "Missing links" },
            ];
        }
        let isHidden = "hidden";
        if (this.state.loginOpen) {
            isHidden = "";
        }
        return React.createElement("div", { className: "navbar-right" },
            React.createElement("button", { onClick: () => this.toggleMenu(), className: "btn btn-primary navbar-btn" }, "Login"),
            React.createElement("div", { className: "nav-box " + isHidden },
                React.createElement(NavMenu_1.NavMenu, { links: links, onClick: (link) => this.handleClick(link) })));
    }
    toggleMenu() {
        this.setState({ loginOpen: !this.state.loginOpen });
    }
    handleClick(link) {
        this.setState({ loginOpen: false });
        if (this.props.onClick) {
            this.props.onClick(link);
        }
    }
}
exports.NavBarLogin = NavBarLogin;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const NavigationHelper_1 = __webpack_require__(2);
class NavBarMenu extends React.Component {
    render() {
        const items = this.props.links.map((link, i) => {
            let active = "";
            if (link.active) {
                active = "active";
            }
            return React.createElement("li", { className: active, key: i },
                React.createElement("a", { href: "/" + link.uri, onClick: (e) => {
                        NavigationHelper_1.NavigationHelper.handleClick(e, () => {
                            this.handleClick(link);
                        });
                    } }, link.name));
        });
        return React.createElement("ul", { className: "nav navbar-nav" }, items);
    }
    handleClick(link) {
        if (this.props.onClick) {
            this.props.onClick(link);
        }
    }
}
exports.NavBarMenu = NavBarMenu;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(0);
const ViewPage_1 = __webpack_require__(4);
class LoginPage extends ViewPage_1.ViewPage {
    constructor(navMan, userMan) {
        super();
        this.navMan = navMan;
        this.userMan = userMan;
        this.navHelper.defaultPage = "index";
        this.navHelper.registerFunction("index", this.index);
        this.navHelper.registerFunction("login/{provider}", this.login);
        this.navHelper.registerFunction("logout", this.logout);
    }
    index(info) {
        return __awaiter(this, void 0, void 0, function* () {
            return React.createElement("div", null, "Quickly hide, you should not be here! Someone is going to get mad...");
        });
    }
    login(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = this.userMan.tryRemoteLogin(info.params.provider);
            temp.then((result) => {
                if (result) {
                    console.log("Sucessful login of: ", result);
                    this.navMan.navigateToDefault();
                }
                else {
                    console.log("Failed");
                }
            });
            return Promise.resolve(React.createElement("div", null, "Logging in please wait"));
        });
    }
    logout(info) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userMan.logout();
            return React.createElement("div", null, "Logged out");
        });
    }
}
exports.LoginPage = LoginPage;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __webpack_require__(3);
const managers_1 = __webpack_require__(11);
const map_1 = __webpack_require__(7);
function request(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            req.onreadystatechange = () => {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        console.log(req);
                        resolve(req.responseText);
                    }
                    else {
                        reject(req);
                    }
                }
            };
            req.open("GET", url, true);
            req.send();
        });
    });
}
class ServerProvider {
    constructor(helper) {
        this.helper = helper;
    }
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.get("courses");
            if (result.statusCode !== 200 || !result.data) {
                return [];
            }
            return result.data;
        });
    }
    getCoursesFor(user, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = state ? "?status=" + models_1.courseUserStateToString(state) : "";
            console.log(status);
            const result = yield this.helper.get("/users/" + user.id + "/courses" + status);
            if (result.statusCode !== 200 || !result.data) {
                return [];
            }
            const arr = [];
            result.data.forEach((ele) => {
                const enroll = ele.enrolled >= 0 ? ele.enrolled : undefined;
                arr.push({
                    course: ele,
                    status: enroll,
                    courseid: ele.id,
                    userid: user.id,
                    user,
                });
            });
            console.log(arr);
            return arr;
        });
    }
    getUsersForCourse(course, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = state ? "?status=" + models_1.courseUserStateToString(state) : "";
            const result = yield this.helper.get("/courses/" + course.id + "/users" + status);
            if (result.statusCode !== 200 || !result.data) {
                return [];
            }
            const arr = [];
            result.data.forEach((ele) => {
                if (managers_1.isCourseEnrollment(ele)) {
                    ele.user = this.makeUserInfo(ele.user);
                    arr.push(ele);
                }
            });
            return arr;
        });
    }
    getAssignments(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.get("courses/" + courseId.toString() + "/assignments");
            if (result.statusCode !== 200 || !result.data) {
                console.log(result);
                throw new Error("Problem with the request");
            }
            return map_1.mapify(result.data, (ele) => {
                ele.deadline = new Date(2017, 7, 18);
                return ele.id;
            });
        });
    }
    addUserToCourse(user, course) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.helper.put("/courses/" + course.id + "/users/" + user.id, {
                courseid: course.id,
                userid: user.id,
                status: models_1.CourseUserState.pending,
            });
            if (resp.statusCode === 201) {
                return true;
            }
            return false;
        });
    }
    changeUserState(link, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.helper.put("/courses/" + link.courseId + "/users/" + link.userid, {
                courseid: link.courseId,
                userid: link.userid,
                status: state,
            });
            if (resp.statusCode === 201) {
                return true;
            }
            return false;
        });
    }
    createNewCourse(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = "courses";
            const data = courseData;
            const resp = yield this.helper.post(uri, data);
            console.log("res = ", resp);
            return true;
        });
    }
    getCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.get("courses/" + id);
            if (result.statusCode !== 200 || !result.data) {
                console.log("Error =>", result);
                return null;
            }
            const data = JSON.parse(JSON.stringify(result.data));
            return data;
        });
    }
    updateCourse(courseId, courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = "courses/" + courseId;
            const resp = yield this.helper.put(uri, courseData);
            if (resp.statusCode !== 200) {
                console.log("Error =>", resp);
                return false;
            }
            console.log("Success => ", resp);
            return true;
        });
    }
    getAllLabInfos() {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
    tryLogin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("tryLogin This could be removed since there is no normal login.");
        });
    }
    logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            window.location.assign("/logout");
            return true;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.get("users");
            if (result.statusCode !== 302 || !result.data) {
                return [];
            }
            const newArray = result.data.map((ele) => this.makeUserInfo(ele));
            return newArray;
        });
    }
    tryRemoteLogin(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestString = null;
            switch (provider) {
                case "github":
                    requestString = "/auth/github";
                    break;
                case "gitlab":
                    requestString = "/auth/gitlab";
                    break;
            }
            if (requestString) {
                window.location.assign(requestString);
                return null;
            }
            else {
                return null;
            }
        });
    }
    changeAdminRole(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.patch("/users/" + user.id + "", { isadmin: true });
            if (result.statusCode < 400) {
                return false;
            }
            return true;
        });
    }
    getDirectories(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = "directories";
            const data = { provider };
            const resp = yield this.helper.post(uri, data);
            if (resp.data) {
                return resp.data;
            }
            return [];
        });
    }
    getLoggedInUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.helper.get("user");
            if (result.statusCode !== 302 || !result.data) {
                return null;
            }
            return this.makeUserInfo(result.data);
        });
    }
    makeUserInfo(data) {
        return {
            firstname: "Agent 00" + data.id,
            lastname: "NR" + data.id,
            isadmin: data.isadmin,
            id: data.id,
            personid: 1000,
            email: "00" + data.id + "@secretorganization.com",
        };
    }
}
exports.ServerProvider = ServerProvider;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NavigationHelper_1 = __webpack_require__(2);
class HttpHelper {
    constructor(pathPrefix) {
        this.PATH_PREFIX = "";
        this.PATH_PREFIX = pathPrefix;
    }
    get pathPrefix() {
        return this.PATH_PREFIX;
    }
    get(uri) {
        return this.send("GET", uri);
    }
    post(uri, sendData) {
        return this.send("POST", uri, sendData);
    }
    put(uri, sendData) {
        return this.send("PUT", uri, sendData);
    }
    delete(uri) {
        return this.send("DELETE", uri);
    }
    patch(uri, sendData) {
        return this.send("PATCH", uri, sendData);
    }
    send(method, uri, sendData) {
        const request = new XMLHttpRequest();
        const requestPromise = new Promise((resolve, reject) => {
            request.onreadystatechange = (ev) => {
                if (request.readyState === 4) {
                    let data;
                    const responseText = request.responseText.trim();
                    if (request.responseText.length < 2) {
                        console.log("Empty response detected");
                    }
                    else if (responseText[0] !== "{" && responseText[0] !== "[") {
                        console.log("Non JSON respons detected");
                    }
                    else {
                        try {
                            data = JSON.parse(request.responseText);
                        }
                        catch (e) {
                            console.error("Could not parse response from server", e, request.responseText);
                        }
                    }
                    const temp = {
                        data,
                        statusCode: request.status,
                    };
                    resolve(temp);
                }
            };
            request.open(method, NavigationHelper_1.combinePath(this.PATH_PREFIX, uri), true);
            request.setRequestHeader("Content-Type", "application/json");
            if (sendData) {
                request.send(JSON.stringify(sendData));
            }
            else {
                request.send();
            }
        });
        return requestPromise;
    }
}
exports.HttpHelper = HttpHelper;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
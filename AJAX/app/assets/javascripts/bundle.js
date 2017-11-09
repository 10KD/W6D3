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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__ (1);
const UsersSearch = __webpack_require__ (3);

document.addEventListener ("DOMContentLoaded", function () {
  $("button.follow-toggle").each(function(i, el) {
    new FollowToggle(el);
  });
  $("nav.users-search").each(function(i, el) {
    new UsersSearch(el);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class FollowToggle {
  constructor (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();

    this.handleClick();
    // this.$el.on("click", this.handleClick.bind(this));
  }

  render() {
    console.log(this.followState);
    if (this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "unfollowing..."){
      this.$el.text("Unfollowing...🤔");
      this.$el.prop("disabled", true);
    } else if (this.followState === "following...") {
      this.$el.text("Following...🤔");
      this.$el.prop("disabled", true);
    } else {
      this.$el.text("Unfollow!");
      this.$el.prop("disabled", false);
    }

  }

  handleClick() {
    this.$el.on("click", event => {
      event.preventDefault();
  
      // console.log(this.userId);
      if (this.followState === "unfollowed") {
        this.followState = "following...";
        this.render();
        APIUtil.followUser(this.userId).then(() => {
          this.followState = "followed";
          this.render();
        });
        // $.ajax({
        //   dataType: "JSON",
        //   url: `/users/${this.userId}/follow`,
        //   type: 'POST',
        //   success: () => {
        //   },
        //   error: (error) => {
        //     console.log(this);
        //     console.log(error);
        //   }
        // });
      } else {
        this.followState = "unfollowing...";
        this.render();
        APIUtil.unfollowUser(this.userId).then(() => {
          this.followState = "unfollowed";
          this.render();
        });
        // $.ajax({
        //   dataType: "JSON",
        //   url: `/users/${this.userId}/follow`,
        //   type: "DELETE",
        //   success: () => {
        //     this.followState = "unfollowed";
        //     this.render();
        //   },
        //   error: (error) => {
        //     console.log(error);
        //   }
        // });

      }
    });
    // const followToggle = this;

    // event.preventDefault();
  }

}

module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: "POST",
      dataType: "JSON"
    })
  ),

  unfollowUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: "DELETE",
      dataType: "JSON"
    })
  ),

  searchUsers: (queryVal, success) => (
    $.ajax({
      url: "/users/search",
      data: { queryVal },
      dataType: "JSON"
    })
  )
};



module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class UsersSearch {
  constructor(el) {
    debugger;
    this.$el = $(el);
    this.input = this.$el.children("input");
    this.ul = this.$el.children("ul");

    this.handleInput();
  }

  handleInput() {
    this.$el.on("input", event => {

      APIUtil.searchUsers(this.input.val()).then((response) => {
        console.log(response);
      });
    });
  }
}

module.exports = UsersSearch;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
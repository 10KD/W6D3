const APIUtil = require("./api_util.js");

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

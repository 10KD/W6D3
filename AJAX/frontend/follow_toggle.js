const APIUtil = require("./api_util.js");

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

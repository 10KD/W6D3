const FollowToggle = require ("./follow_toggle.js");
const UsersSearch = require ("./users_search.js");

document.addEventListener ("DOMContentLoaded", function () {
  $("button.follow-toggle").each(function(i, el) {
    new FollowToggle(el);
  });
  $("nav.users-search").each(function(i, el) {
    new UsersSearch(el);
  });
});

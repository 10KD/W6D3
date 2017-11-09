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

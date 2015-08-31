
Meteor.users.allow({
  update: function (userId, user, fieldNames) {
    console.log(Meteor.user().is_admin, (userId && userId === user._id) || Meteor.user().is_admin)
    return (userId && userId === user._id) || Meteor.user().is_admin;
  },
});

Meteor.users.deny({
  update: function(userId, user, fieldnames, modifier) {
    console.log(Meteor.user().is_admin, (userId && userId === user._id) || Meteor.user().is_admin)

    if (user.has_submitted === true &&
        _.contains(fieldnames, 'has_submitted') && !Meteor.user().is_admin) {
      return true;
    }
    return false;
  }
});


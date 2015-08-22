
Meteor.users.allow({
  update: function (userId, doc, fieldNames) {
    return userId && userId === doc._id;
  },
});

Meteor.users.deny({
  update: function(userId, doc, fieldnames, modifier) {
    if (doc.has_submitted === true &&
        _.contains(fieldnames, 'has_submitted')) {
      return true;
    }
    return false;
  }
});

Responses = new Mongo.Collection("responses");

Responses.allow({

  insert: function (userId, response) {
    return !Meteor.users.find(userId).has_submitted;
  },

  update: function (userId, response, fields, modifier) {
    return Meteor.user().is_admin;
  },

  remove: function (userId, response) {
    return Meteor.user().is_admin;
  }
});

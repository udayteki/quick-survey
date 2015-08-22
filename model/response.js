Responses = new Mongo.Collection("responses");

Responses.allow({

  insert: function (userId, response) {
    return !Meteor.users.find(userId).has_submitted;
  },

  update: function (userId, response, fields, modifier) {
    // No-one ToDo: Let users change their own response?
    return false;
  },

  remove: function (userId, response) {
    // ToDo: User needs to be admin
    return false;
  }

});

Sites = new Mongo.Collection("sites");

Sites.allow({

  insert: function (userId, response) {
    return Meteor.user().is_admin;
  },

  update: function (userId, response, fields, modifier) {
    return Meteor.user().is_admin;
  },

  remove: function (userId, response) {
    return Meteor.user().is_admin;
  }
});

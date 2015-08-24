Surveys = new Mongo.Collection("surveys");

Surveys.allow({

  insert: function (userId, survey) {
    // ToDo: User needs to be admin
    if (Meteor.user().emails[0].address === "admin@admin.com") {
      return true;
    }
  },

  update: function (userId, survey, fields, modifier) {
    // ToDo: Make admin an actual check
    if (Meteor.user().emails[0].address === "admin@admin.com") {
      return true;
    }
    return false;
  },

  remove: function (userId, survey) {
    // ToDo: User needs to be admin
    if (Meteor.user().emails[0].address === "admin@admin.com") {
      return true;
    }
  }

});

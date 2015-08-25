Surveys = new Mongo.Collection("surveys");

Surveys.allow({

  insert: function (userId, survey) {
    // ToDo: User needs to be admin
    if (Meteor.user().is_admin) {
      return true;
    }
    return false;
  },

  update: function (userId, survey, fields, modifier) {
    // ToDo: Make admin an actual check
    if (Meteor.user().is_admin) {
      return true;
    }
    return false;
  },

  remove: function (userId, survey) {
    // ToDo: User needs to be admin
    if (Meteor.user().is_admin) {
      return true;
    }
    return false;
  }

});

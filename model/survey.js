Surveys = new Mongo.Collection("surveys");

Surveys.allow({

  insert: function (userId, survey) {
    if (Meteor.user().is_admin)
      return true;

    var sandstorm = Meteor.user().services.sandstorm;
    if (sandstorm && sandstorm.permissions[0] === 'owner')
      return true;
    return false;
  },

  update: function (userId, survey, fields, modifier) {
    if (Meteor.user().is_admin) {
      return true;
    }

    var sandstorm = Meteor.user().services.sandstorm;
    if (sandstorm && sandstorm.permissions[0] === 'owner')
      return true;

    return false;
  },

  remove: function (userId, survey) {
    if (Meteor.user().is_admin) {
      return true;
    }

    var sandstorm = Meteor.user().services.sandstorm;
    if (sandstorm && sandstorm.permissions[0] === 'owner')
      return true;

    return false;
  }

});

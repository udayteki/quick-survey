Questions = new Mongo.Collection("questions");

Questions.allow({

  insert: function (userId, question) {
    // ToDo: User needs to be admin
    return false;
  },

  update: function (userId, question, fields, modifier) {
    // ToDo: User needs to be admin
    return false;
  },

  remove: function (userId, question) {
    // ToDo: User needs to be admin
    return false;
  }

});

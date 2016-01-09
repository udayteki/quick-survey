Meteor.methods({
  exportAllResponses: function() {
    var responses = Responses.find().fetch();

    var fields = [];

    responses[0].survey.questions.forEach(function(question) {
      fields.push(question.question);
    });

    var data = [];

    _.each(responses, function(response, index) {
      data[index] = [];
      response.questions.forEach(function(question) {
        data[index].push(question.answer);
      });
    });

    return {fields: fields, data: data};
  },
  resetUsers: function(){
    Meteor.users.find({}).forEach(function(user) {
      Meteor.users.update(
          {has_submitted: true},
          {$set: {has_submitted: false}},
          {multi: true})
    });
  },
  resetResponses: function() {
    Responses.remove({})
  },
  submitResponse: function(response) {
    Responses.insert(response, function(err, id) {
      if (err) console.log('error', err);
      Meteor.users.update(Meteor.userId(), {$set: {has_submitted: true}});
    })
  }
});

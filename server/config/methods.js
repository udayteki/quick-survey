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
  }
});

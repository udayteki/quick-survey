// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    if (Meteor.user() && Meteor.user().is_admin) {
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running,
      // without waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
  },
  resendVerificationEmail: function(email) {
    var relevantUser = Meteor.users.findOne({ "emails.address" : email });
    Accounts.sendVerificationEmail(relevantUser._id, email);
  }
});

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

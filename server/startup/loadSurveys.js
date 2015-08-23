Meteor.startup(function () {

  if (Surveys.find().count() === 0) {

    var questions = [{
        'question': "What's your first choice of a logo?",
        'type': 'number',
        'required': true
      },{
        'question': 'And your second choice?',
        'type': 'number'
      },{
        'question': 'Anything else you think we should know?',
        'type': 'textarea'
      }
    ];
    var survey = {
      'active': true,
      'questions': questions,
      'close_date': undefined,
      'name': 'Open Source Design Logo Survey',
      'require_sign_in': true
    };
    Surveys.insert(survey);
  }
});


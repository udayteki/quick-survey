Meteor.startup(function () {

  if (Questions.find().count() === 0) {

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

    for (var i = 0; i < questions.length; i++)
      Questions.insert(questions[i]);
  }
});


Meteor.publish("surveys", function () {

  console.log(Meteor.users.find({'is_admin': true}));

  return Surveys.find();
});

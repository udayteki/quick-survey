Meteor.publish("users",function(){

  Counts.publish(this, 'numberOfAdmin', Meteor.users.find({
    'is_admin': true
  }), { noReady: true });

  return Meteor.users.find({},{fields:
    {emails: 1, profile: 1, has_submitted: 1, is_admin: 1}
  });
});

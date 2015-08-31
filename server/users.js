Meteor.publish('users',function(){

  Counts.publish(this, 'numberOfAdmin', Meteor.users.find({
    'is_admin': true
  }), { noReady: true });

  return Meteor.users.find({},{fields:
    {emails: 1, profile: 1, has_submitted: 1, is_admin: 1}
  });
});

Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId},
                           {fields: { emails: 1,
                                      profile: 1,
                                      has_submitted: 1,
                                      is_admin: 1 }});
});

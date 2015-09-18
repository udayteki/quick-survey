Accounts.validateLoginAttempt(function(attemptInfo) {

  if (attemptInfo.type == 'resume') return true;

  if (attemptInfo.methodName == 'createUser' && !attemptInfo.error) {
    throw new Meteor.Error('account-created', 'Verification e-mail sent.');
  }

  if (attemptInfo.methodName == 'login' && attemptInfo.allowed) {
    var verified = false;
    var email = attemptInfo.methodArguments[0].user.email;
    attemptInfo.user.emails.forEach(function(value, index) {
      if (email == value.address && value.verified) verified = true;
    });
    if (!verified) throw new Meteor.Error('verify-account', 'E-mail verification needed.');
  }

  return true;
});

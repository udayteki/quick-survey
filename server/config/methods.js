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
          {multi: true});
    });
  },
  resetResponses: function() {
    Responses.remove({});
  },
  submitResponse: function(response) {
    Responses.insert(response, function(err, id) {
      if (err) console.log('error', err);
      Meteor.users.update(Meteor.userId(), {$set: {has_submitted: true}});
    });
  },
  getPublishID: function () {
    var spawn = require('child_process').spawn;
    var execFile = require('child_process').execFile;
    console.log('sandstormSessionID:', this.connection.sandstormSessionId());
    let sandstormSessionID = this.connection.sandstormSessionId();
    let pathToPublicID = '/getPublicId';
    let execStr = pathToPublicID + ' ' + sandstormSessionID;

    var fs = require('fs');

    fs.readdir('/', function (err, files) {
      console.log('. files', files);
    });

    // walk('/', function(err, results) {
    //   if (err) throw err;
    //   console.log(results);
    // });


    // execFile(pathToPublicID, [sandstormSessionID], function (error, stdout, stderr) {
    //   if (error) console.log('error', error);
    //   console.log('stdout', stdout);
    //   console.log('stderror', stderr);
    // })
    const getPublicId = spawn(pathToPublicID, [sandstormSessionID]);
    getPublicId.on('error', function( err ){ console.log('err', err) });
    getPublicId.stdout.on('data', function (data) { console.log('d', data) });
    getPublicId.stderr.on('data', function (data) { console.log('e', data) });

  },
});

var fs = require('fs');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

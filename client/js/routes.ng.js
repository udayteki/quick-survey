(function () {

  angular.module('quick-survey').run(function($rootScope, $state) {

    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'SET_UP_COMPLETE')
        $state.go('index');
    });

  });

  angular.module("quick-survey").config(
    function ($urlRouterProvider, $stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('index', {
          url: '/',
          templateUrl: 'client/js/surveys/views/survey.ng.html',
          controller: 'SurveyCtrl',
          resolve: {
            'surveys': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: deferred.resolve,
                onStop: deferred.reject
              });

              return deferred.promise;
            }],
            'hasSubmitted': ['$q', '$auth', '$state', function ($q, $auth, $state) {
              $auth.waitForUser()
                .then(function () {
                  if (Meteor.user().has_submitted) {
                    $state.go('submitted');
                  } else {
                    return true;
                  }
                });
            }],

          }
        })
        .state('submitted', {
          url: '/submitted',
          templateUrl: 'client/js/surveys/views/submitted.ng.html',
          controller: 'SubmittedCtrl',
          resolve: {
            'surveys': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: deferred.resolve,
                onStop: deferred.reject
              });

              return deferred.promise;
            }],
            // 'hasSubmitted': ['$state', '$auth', function($state, $auth, $q) {
              // if (Session.get('has_submitted') === -1) {
              //   console.log('going to index because session hasn\'t submitted');
              //   $state.go('index');

              // } else {
              //   console.log('going to wait for the user');

              //   checkIfManager($q, $auth)
              //     .then(function (user) {
              //       console.log(Meteor.user());
              //     })
              //     .catch(function () {
              //       console.log('no one found');
              //     });
                // $auth.waitForUser().then(function() {
                  // console.log('we waited.');
                  // if (Meteor.user() && !Meteor.user().has_submitted){
                  //   console.log('found a user and the user hasn\'t submitted yet');
                  //   $state.go('index');
                  // } else {
                  //   console.log('permission granted! continue fair wanderer...');
                  //   return true;
                  // }
                // });
              // }
            // }]
          }
        })
        .state('manage', {
          url: '/manage',
          templateUrl: 'client/js/manage/views/manage.ng.html',
          controller: 'ManageCtrl',
          resolve: {
            'currentUser': ['$q', function($q){
              var deferred = $q.defer();

              Meteor.autorun(function() {
                if (!Meteor.loggingIn()){
                  var user = Meteor.user();
                  if (user && user.is_admin)
                    deferred.resolve();
                  if (user) {
                    var sandstorm = Meteor.user().services.sandstorm;
                    if (sandstorm && sandstorm.permissions[0] === 'owner')
                      deferred.resolve();

                  }
                 deferred.reject('UNAUTHORIZED');
                }
              });

              return deferred.promise;
            }],
            'activeSurvey': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('surveys', {
                onReady: function() {
                  var surveys = Surveys.find({active: true}).fetch();
                  if (surveys.length > 0) {
                    var survey = Surveys.findOne(surveys[0]._id);
                    deferred.resolve(survey);
                  } else {
                    // let's create an active survey
                    Surveys.insert({
                      questions: [],
                      description: 'This describes my first survey',
                      name: 'My First Survey',
                      require_sign_in: false,
                      active: true
                    }, function(err, id) {
                      if (err) deferred.reject(err);
                      deferred.resolve(Surveys.findOne(id));
                    });
                  }

                },
                onStop: deferred.reject
              });
              return deferred.promise;
            }],
            'responses': ['$q', function($q) {
              var deferred = $q.defer();

              Meteor.subscribe('responses', {
                onReady: function() {
                  deferred.resolve(Responses.find());
                },
                onStop: deferred.reject
              });

              return deferred.promise;
            }]
          }
        });

      $urlRouterProvider.otherwise("/");
    })

  .run(function($rootScope, $q, $state, $auth, $timeout) {

    $rootScope.on_sandstorm = true;

    checkIfManager($q, $auth)
      .then(function () {
        $rootScope.is_admin = true;
        $rootScope.on_sandstorm = true;
        $state.go('manage');
      })
      .catch(function () {
        $state.go('index');
      });
  });

  function checkIfUser($q, $auth) {

  }

  function checkIfManager($q, $auth) {
    return $q(function (resolve, reject) {
      return $auth.waitForUser().then(function() {
        var user = Meteor.sandstormUser();
        if (user) {
          var isAdmin = false;
          var managePermissions = ['owner', 'manager'];
          managePermissions.forEach(function (permission) {
            if (user.permissions.indexOf(permission) > -1) {
              isAdmin = true;
            }
          });
          if (isAdmin) {
            resolve(user);
          } else {
            reject(user);
          }
        } else {
          reject();
        }
      });
    });
  }

})();

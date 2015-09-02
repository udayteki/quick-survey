angular.module('quick-survey').run(function($rootScope, $state) {

  Meteor.subscribe("userData");

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log('state change error', error);
    // We can catch the error thrown when the $requireUser promise is rejected

    // and redirect the user back to the main page
    // console.log(event, next, previous, error);
    if (error === 'UNAUTHORIZED' || error === 'AUTH_REQUIRED') {
      $state.go('active-survey');
    }

  });

  $rootScope.$watch('currentUser', function() {
    if (!$rootScope.loggingIn && $rootScope.currentUser === null) {
      $state.go('active-survey');
    }
  });

});

angular.module("quick-survey").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('active-survey', {
        url: '/',
        templateUrl: 'client/js/surveys/views/survey.ng.html',
        controller: 'SurveyCtrl',
        resolve: {
          'currentUser': ['$meteor', function($meteor) {
            return $meteor.waitForUser();
          }],
        }
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'client/js/admin/views/admin.ng.html',
        controller: 'AdminCtrl',
        resolve: {
          'currentUser': ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      })
      .state('setup', {
        url: '/setup',
        templateUrl: 'client/js/admin/views/setup.ng.html',
        controller: 'SetupCtrl',
        controllerAs: 'sc',
        resolve: {
          // 'currentUser': ['$meteor', function($meteor) {
          //   return $meteor.waitForUser();
          // }],
          'checkAdmin': ['$meteor', '$state', '$q', '$rootScope',
            function($meteor, $state, $q, $rootScope) {
              return $q(function(resolve, reject) {
                $q.all([
                  $meteor.subscribe('sites'),
                  $meteor.subscribe('users')
                ])
                .then(function() {
                  var site = $meteor.collection(Sites, false)[0]
                  var numOfAdmin = $meteor.object(Counts ,'numberOfAdmin', false);
                  console.log(numOfAdmin.count);
                  console.log(site);
                  if (numOfAdmin.count !== 0 && site.has_been_set_up === true) {
                    reject('SET_UP_COMPLETE');
                  } else if (numOfAdmin.count !== 0) {
                    site = $meteor.object(Sites,
                                          site._id,
                                          false).subscribe('sites');
                    site.has_been_set_up = true;
                    site.save();
                    reject('UNAUTHORIZED');
                  } else {
                    resolve();
                  }
                });
              });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  }]);

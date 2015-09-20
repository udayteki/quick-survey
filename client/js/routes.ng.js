angular.module('quick-survey').run(function($rootScope, $state) {

  // Any special state change things?

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
          'currentUser': ['$meteor', function($meteor) {
            return $meteor.waitForUser();
          }],
        }
      })
      .state('manage', {
        url: '/manage',
        templateUrl: 'client/js/manage/views/manage.ng.html',
        controller: 'ManageCtrl',
        resolve: {
          'currentUser': ["$meteor", function($meteor){
            return $meteor.requireValidUser(function(user) {
              if (user.is_admin) return true;
              return 'UNAUTHORIZED';
            });
          }]
        }
      });

    $urlRouterProvider.otherwise("/");
  });

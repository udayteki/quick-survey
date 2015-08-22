angular.module('quick-survey').run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

    // We can catch the error thrown when the $requireUser promise is rejected

    // and redirect the user back to the main page
    // console.log(event, next, previous, error);
    if (error === 'UNAUTHORIZED') {
      $state.go('questions');
    }

  });

}]);

angular.module("quick-survey").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('questions', {
        url: '/',
        templateUrl: '/client/questions/views/questions-list.ng.html',
        controller: 'QuestionListCtrl'
      })
    //   .state('admin', {
    //     url: '/admin',
    //     templateUrl: 'client/admin/views/admin.ng.html',
    //     controller: 'AdminCtrl',
    //     resolve: {
    //       'currentUser': ["$meteor", function($meteor){
    //         return $meteor.requireValidUser(function(user) {
    //           if (user.emails[0].address === "admin@admin.com")
    //             return true;
    //           return 'UNAUTHORIZED';
    //         });
    //       }]
    //     }
    //   });

    $urlRouterProvider.otherwise("/");
  }]);

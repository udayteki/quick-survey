
angular.module('quick-survey').controller('SetupCtrl',
  function ($scope, $meteor, $state, $rootScope) {
    var vm = this;
    vm.newAdmin = {};

    vm.createAdmin = function() {
      $meteor.createUser(vm.newAdmin).then(
        function () {
          $rootScope.currentUser.is_admin = true;
          $scope.user = $meteor.object(Meteor.users, $rootScope.currentUser._id, false).subscribe('users');
          $scope.user.is_admin = true;
          $scope.user.save();
          $state.go('manage');
        },

        function (err) {
          vm.error = 'Registration error - ' + err;
        }
      );
    };
});

angular.module("quick-survey").controller("LoginCtrl",
  function ($meteor, $state) {
    var vm = this;

    vm.credentials = {
      email: '',
      password: ''
    };

    vm.error = '';

    vm.sendEmailVerification = function() {
      Meteor.call('resendVerificationEmail', vm.credentials.email);
    };

    vm.login = function () {
      $meteor.loginWithPassword(vm.credentials.email, vm.credentials.password).then(
        function () {
          $state.go('active-survey');
        },
        function (err) {
          vm.error = err;
        }
      );
    };
  }
);


import angularMeteor from 'angular-meteor';

angular.module('quick-survey', [
  angularMeteor,
  'angular-meteor.auth',
  'ui.router',
  'ngSanitize',
  'btford.markdown']);

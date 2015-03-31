(function() {
  'use strict';

  angular.module('firebase.auth', ['firebase', 'firebase.utils'])

    .factory('AuthFactory', function($firebaseAuth, FBURL) {
      var service = {};
      service.ref = new $window.Firebase(FBURL);
      service.auth = $firebaseAuth(service.ref);
      service.login = function() {
        return service.auth.$authWithOAuthPopup('google');
      };
      service.logout = function() {
        service.auth.$unauth();
      };
      return service;
    });

}).call(angular);

(function() {
  'use strict';

  angular.module('listy', ['firebase', 'monospaced.elastic'])

    .constant('FBURL', 'https://listy-app.firebaseio.com')

    .run(function($rootScope, Auth) {
      Auth.$onAuth(function(user) {
        $rootScope.loggedIn = !!user;
      });
    });

}).call(angular);

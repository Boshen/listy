(function() {

  angular.module('listy', ['firebase', 'monospaced.elastic'])

    .factory('AuthFactory', function($window, $firebaseAuth) {
      var service = {};
      service.ref = new $window.Firebase('https://listy-app.firebaseio.com');
      service.auth = $firebaseAuth(service.ref);
      service.login = function() {
        return service.auth.$authWithOAuthPopup('google');
      };
      service.logout = function() {
        service.auth.$unauth();
      };
      return service;
    })

    .service('TodosService', function($firebaseArray) {
      return function(ref, userId) {
        return $firebaseArray(ref.child('users').child(userId).child('todos'));
      };
    })

    .controller('ListyCtrl', function($scope, AuthFactory, TodosService) {

      $scope.authData = null;
      $scope.newTodo = null;

      $scope.login = function() {
        AuthFactory.login().then(function(authData) {
          $scope.authData = authData;
        });
      };

      $scope.logout = AuthFactory.logout;

      $scope.addTodo = function() {
        $scope.todos.$add({text: $scope.newTodo.text});
        clearNewTodo();
      };

      function clearNewTodo() {
        $scope.newTodo = {text: ''};
      };

      function init() {
        clearNewTodo();
        AuthFactory.auth.$onAuth(function(authData) {
          if (authData) {
            $scope.authData = authData;
            $scope.todos = new TodosService(AuthFactory.ref, authData.uid);
          } else {
            if ($scope.todos) {
              $scope.todos.$destroy();
            }
            $scope.authData = null;
            $scope.todos = null;
            clearNewTodo();
          }
        });
      };

      $scope.toggle = false;
      $scope.checked = false;

      init();

    });

}).call(this);

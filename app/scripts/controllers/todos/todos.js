(function() {
  'use strict';

  angular.module('listy.todos', ['ngRoute', 'firebase', 'monospaced.elastic'])

    .config(function($routeProvider) {
      return $routeProvider.when('/todos', {
        templateUrl: 'controllers/todos/todos.html',
        controller: 'TodosCtrl',
        reloadOnSearch: false,
        resolve: {
          user: ['Auth', function (Auth) {
            return Auth.$waitForAuth();
          }]
        }
      });
    })

    .constant('TWODAYS', 48 * 60 * 60 * 1000)

    .service('TodosService', function($window, $firebaseArray, TWODAYS) {
      return function(ref, userId) {
        var todosRef =
          ref.child('users')
            .child(userId)
            .child('todos')
            .orderByPriority()
            .endAt(-$window.Date.now() + TWODAYS);
        return $firebaseArray(todosRef);
      };
    })

    .controller('TodosCtrl', function($scope, $window, AyuthFactory, TodosService, $interval, TWODAYS) {

      $scope.authData = null;
      $scope.newTodo = null;

      $scope.login = function() {
        AuthFactory.login().then(function(authData) {
          $scope.authData = authData;
        });
      };

      $scope.logout = AuthFactory.logout;

      $scope.addTodo = function() {
        if ($scope.newTodo.text.length > 1) {
          $scope.todos.$add({
            text: $scope.newTodo.text,
            checked: false,
            $priority: -$window.Date.now()
          });
          clearNewTodo();
        }
      };

      $scope.checkTodo = function(todo) {
        todo.checked = !todo.checked;
        $scope.todos.$save(todo);
      };

      $scope.displayName = function() {
        return $scope.authData.google.cachedUserProfile.given_name;
      };

      $scope.profilePic = function() {
        return $scope.authData.google.cachedUserProfile.picture;
      };

      var stopInterval = $interval(function(){
        var hasOutdated = $scope.todos.some(function(todo) {
          return $window.Date.now() + todo.$priority > TWODAYS;
        });
        if (hasOutdated) {
          $scope.todos = new TodosService(AuthFactory.ref, $scope.authData.uid);
        }
      }, 1000 * 60);

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

      init();

      $scope.$on('$destroy', function() {
        stopInterval();
      });

    });

}).call(angular);

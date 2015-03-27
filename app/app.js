(function(){

  angular.module('listy', ['firebase', 'monospaced.elastic'])

    .controller('ListyCtrl', function($scope, $firebaseArray) {

      var fireRef = new Firebase("https://listy-app.firebaseio.com/");

      $scope.todos = $firebaseArray(fireRef);

      $scope.addTodo = function(newTodoText) {
        $scope.todos.$add({
          text: newTodoText
        });
        clearNewTodo();
      };

      function clearNewTodo() {
        $scope.newTodo = {
          text: ''
        };
      };

      function init() {
        clearNewTodo();
      };

      $scope.toggle = false;
      $scope.checked = false;

      init();

    });

}).call(this);
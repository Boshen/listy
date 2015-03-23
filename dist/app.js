(function(){

  angular.module('listy', ['firebase'])

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

      init();

    });

}).call(this);

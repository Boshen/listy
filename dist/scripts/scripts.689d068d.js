(function(){angular.module("listy",["firebase","monospaced.elastic"]).constant("TWODAYS",1728e5).factory("AuthFactory",["$window","$firebaseAuth",function(a,b){var c={};return c.ref=new a.Firebase("https://listy-app.firebaseio.com"),c.auth=b(c.ref),c.login=function(){return c.auth.$authWithOAuthPopup("google")},c.logout=function(){c.auth.$unauth()},c}]).service("TodosService",["$window","$firebaseArray","TWODAYS",function(a,b,c){return function(d,e){var f=d.child("users").child(e).child("todos").orderByPriority().endAt(-a.Date.now()+c);return b(f)}}]).controller("ListyCtrl",["$scope","$window","AuthFactory","TodosService","$interval","TWODAYS",function(a,b,c,d,e,f){function g(){a.newTodo={text:""}}function h(){g(),c.auth.$onAuth(function(b){b?(a.authData=b,a.todos=new d(c.ref,b.uid)):(a.todos&&a.todos.$destroy(),a.authData=null,a.todos=null,g())})}a.authData=null,a.newTodo=null,a.login=function(){c.login().then(function(b){a.authData=b})},a.logout=c.logout,a.addTodo=function(){a.newTodo.text.length>1&&(a.todos.$add({text:a.newTodo.text,checked:!1,$priority:-b.Date.now()}),g())},a.checkTodo=function(b){b.checked=!b.checked,a.todos.$save(b)},a.displayName=function(){return a.authData.google.cachedUserProfile.given_name},a.profilePic=function(){return a.authData.google.cachedUserProfile.picture};var i=e(function(){var e=a.todos.some(function(a){return b.Date.now()+a.$priority>f});e&&(a.todos=new d(c.ref,a.authData.uid))},6e4);h(),a.$on("$destroy",function(){i()})}])}).call(this);
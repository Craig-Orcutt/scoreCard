'use strict';

angular
.module('score')
.controller('HomeCtrl', function($scope, AuthFactory, $window){
    $scope.UserLogIn = () =>{
        AuthFactory.googleLogin()
        .then((user)=>{
            $window.location.href = '#!/ScoreCard';
        });
    };
});
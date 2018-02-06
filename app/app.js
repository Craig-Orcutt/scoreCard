'use strict';

angular.module("score", ["ngRoute"])
    .constant("FBUrl", "https://scorecard-2a336.firebaseio.com/")
    .config($routeProvider => {
        $routeProvider
            .when('/login', {
                templateUrl: "partial/Login.html",
                controller: "LoginCtrl"
            })
            .otherwise('/');
        });
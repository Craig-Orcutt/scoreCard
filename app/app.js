'use strict';

let isLoggedIn = (AuthFactory) => {
    new Promise((resolve, reject) => {
        AuthFactory.isLoggedIn()
        .then(bool => {

            if (bool) {

                resolve();
            } else {

                reject();
            }
        });
    }); 
};
angular.module("score", ["ngRoute", "chart.js"])
    .constant("FBUrl", "https://scorecard-2a336.firebaseio.com/")
    .config($routeProvider => {
        $routeProvider
            .when('/home', {
                templateUrl: "partial/Home.html",
                controller: "HomeCtrl"
            })
            .when('/ScoreCardList', {
                templateUrl: 'partial/ScoreCardList.html',
                controller: 'ScoreCardList',
                resolve: { isLoggedIn }
            })
            .when('/Stats', {
                templateUrl: 'partial/Stats.html',
                controller: 'StatsCtrl',
                resolve: { isLoggedIn }
            })
            .when('/Stats/all', {
                templateUrl: 'partial/AllStats.html',
                controller: 'AllStatsCtrl',
                resolve: { isLoggedIn }
            })
            .when('/Stats/user', {
                templateUrl: 'partial/UserStats.html',
                controller: 'UserStatsCtrl',
                resolve: { isLoggedIn }
            })
            .when('/Stats/:id', {
                templateUrl: 'partial/SingleStats.html',
                controller: 'SingleStats',
                resolve: { isLoggedIn }
            })
            .when('/ScoreCard/:id', {
                templateUrl: 'partial/ScoreCard.html',
                controller: 'ScoreCard',
                resolve: { isLoggedIn }
            })
            .otherwise('/home');
    })


    .run(FBCreds => {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
}); 
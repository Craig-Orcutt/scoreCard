'use strict';

let isLoggedIn = (AuthFactory) => {
    new Promise((resolve, reject) => {
        AuthFactory.isLoggedIn()
        .then(bool => {
            console.log("user???", bool);
            if (bool) {
                console.log("Logged in . Go ahead");
                resolve();
            } else {
                console.log("Not Logged IN . Go away");
                reject();
            }
        });
    }); 
};
angular.module("score", ["ngRoute"])
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
            .when('/NewScoreCard',{
                templateUrl: 'partial/NewScoreCard.html',
                controller: 'NewScoreCardCtrl',
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
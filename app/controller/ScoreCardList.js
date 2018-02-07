'use strict';

angular
.module('score')
.controller('ScoreCardList', function($scope, $route, ScoreCardFactory, $location, AuthFactory){

    firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
            ScoreCardFactory.getScoreCardList(user.uid)
            .then((data)=>{
                console.log('scorecards', data);
                
                $scope.ScoreCards = data;

            });
        }else{
            console.log('err');    
        }
    });

    $scope.deleteScoreCard = (scoreCardID) => {
        ScoreCardFactory.deleteScoreCard(scoreCardID)
        .then(()=>{
            ScoreCardFactory.getScoreCardList();
            $route.reload();
        });
    };


});
'use strict';

angular
.module('score')
.controller('UserStatsCtrl', function($scope , ScoreCardFactory, $location){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            ScoreCardFactory.getScoreCardList(user.uid)
                .then((data) => {
                    console.log('scorecards', data);
                    $scope.AllScoreCards = data;
                });
        } else {
            console.log('err');
        }
    });

    $scope.goToScoreCard = (scoreCardId) => {
        $location.url(`/ScoreCard/${scoreCardId}`);
    };

    $scope.goToSingleStats = (scoreCardId) => {
        $location.url(`/Stats/${scoreCardId}`);
    };

    
    
});
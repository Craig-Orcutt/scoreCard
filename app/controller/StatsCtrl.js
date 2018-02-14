'use strict';

angular
.module('score')
.controller('StatsCtrl', function($scope, ScoreCardFactory, $location){
    console.log('hey');
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            ScoreCardFactory.getScoreCardList(user.uid)
                .then((data) => {
                    console.log('scorecards', data);
                    $scope.AllScoreCards = data;
                    // GolfCourseFactory.getCourseData()
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

    $scope.AllStats =  () => {        
        $location.url(`/Stats/all`);
    };

    $scope.UserStats =  () => {        
        $location.url(`/Stats/all`);
    };
});
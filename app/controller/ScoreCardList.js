'use strict';

angular
    .module('score')
    .controller('ScoreCardList', function ($scope, $route, ScoreCardFactory, $location, AuthFactory) {
        $scope.ScoreCard = {
            date: '',
            GCID: ''
        };
        // $scope.ScoreCardGCID1 = $scope.ScoreCard.GCID;
        // $scope.ScoreCardGCID2 = $scope.ScoreCard.GCID;
        
        $scope.CreateScoreCard = () => {
            console.log('button clicked');
            $scope.ScoreCard.uid = firebase.auth().currentUser.uid;
            ScoreCardFactory.addNewScoreCard($scope.ScoreCard)
                .then((data) => {
                    console.log('scoreCard Added in Controller', data);
                    $route.reload();
                });
        };


        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                ScoreCardFactory.getScoreCardList(user.uid)
                    .then((data) => {
                        console.log('scorecards', data);
                        $scope.ScoreCards = data;
                    });
            } else {
                console.log('err');
            }
        });

        $scope.deleteScoreCard = (scoreCardId) => {
            ScoreCardFactory.deleteScoreCard(scoreCardId)
                .then(() => {
                    ScoreCardFactory.getScoreCardList();
                    $route.reload();
                });
        };
    });
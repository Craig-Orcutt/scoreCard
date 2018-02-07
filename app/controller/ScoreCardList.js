'use strict';

angular
    .module('score')
    .controller('ScoreCardList', function ($scope, $route, ScoreCardFactory, $location, AuthFactory, GolfCourseFactory) {
        $scope.ScoreCard = {
            date: '',
            GCID: '',
            CourseName: ''
        };

        GolfCourseFactory.getCourseData()
        .then((data)=>{
            $scope.ScoreCard.CourseName = data.data[0].name;
        });

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
                    // .then(()=>{
                    //     GolfCourseFactory.getCourseData()
                    //     .then((data)=>{
                    //         console.log('course name', data.data.name);
                    //     });
                    // });
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

        $scope.goToScoreCard = (scoreCardId) => {
            $location.url(`/ScoreCard/${scoreCardId}`);
        };
    });
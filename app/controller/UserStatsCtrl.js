'use strict';

angular
.module('score')
.controller('UserStatsCtrl', function($scope , ScoreCardFactory){
    $scope.GraphScore = [];
    $scope.GraphDate = [];

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            ScoreCardFactory.getScoreCardList(user.uid)
                .then((data) => {
                    console.log('scorecards', data);
                    $scope.AllScoreCards = data;
                    // GolfCourseFactory.getCourseData()
                    $scope.AllScoreCards.forEach((element)=>{
                            $scope.GraphDate.push(element.date);
                            $scope.GraphScore.push(element.roundScore);
                    });



                });
        } else {
            console.log('err');
        }
    });
    // setting array to x axis
    $scope.labels = $scope.GraphDate;
    $scope.series = ['Series A'];
//   setting array to y axis
    $scope.data = [
        $scope.GraphScore
    ];
// not sure what but im supposed to have it
    $scope.barDatasetOverride = [
        {
            label: "Bar chart",
            borderWidth: 1,
            type: 'bar'
        }
    ];

    
    
});
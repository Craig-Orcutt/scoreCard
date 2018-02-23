'use strict';

angular
.module('score')
.controller('StatsCtrl', function($scope, ScoreCardFactory, $location){
    console.log('hey');


    $scope.AllStats =  () => {        
        $location.url(`/Stats/all`);
    };

    $scope.UserStats =  () => {        
        $location.url(`/Stats/user`);
    };
        $scope.GraphScore = [];
    $scope.GraphDate = [];
    $scope.average = 0;

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

                    $scope.average = _.mean($scope.GraphScore).toFixed(2);
                    console.log('average', $scope.average);
                    
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
            $scope.colors = [{ 
                    borderColor:  'rgba(225, 128, 81, 0.7)',
                    backgroundColor:'rgb(201, 81, 53)',
                    borderWidth: 5
                }];
// $scope.chartOptions = 

// options for labels on x an y axes 
$scope.labelOptions = {

    scales: { 
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize : 15,
                stepSize: 10,
                beginAtZero: true
            }
        }],
        xAxes : [{
            stacked: true,
			barThickness: 55,
				gridLines:{
					display:true,
				},
            ticks: {
                fontColor: 'white',
                fontSize: 20,
                fontFamily: 'Futura'
            }
        }]
    }
};
});
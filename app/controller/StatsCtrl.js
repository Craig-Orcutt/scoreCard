'use strict';

angular
.module('score')
.controller('StatsCtrl', function($scope, ScoreCardFactory, $location){
    $scope.AllStats =  () => {        
        $location.url(`/Stats/all`);
    };


    $scope.GraphScore = [];
    $scope.GraphDate = [];
    $scope.averageScore = 0;
    $scope.courseAverage = 0;
    
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            ScoreCardFactory.getScoreCardList(user.uid)
                .then((data) => {
                    $scope.AllScoreCards = data;      
                    console.log('data', $scope.AllScoreCards);
                                  
                    $scope.AllScoreCards.forEach((element)=>{
                        $scope.GraphDate.push(element.date);
                        $scope.GraphScore.push(element.roundScore);          
                    });
                    // let courseObj = [];
                    // $scope.AllScoreCards.forEach((element)=>{
                    //     courseObj[element.name] = element.roundScore;
                    //     console.log('course', courseObj);
                    //     });
                    $scope.averageScore = _.mean($scope.GraphScore).toFixed(2);
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
			barThickness: 45,
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
// buttons for overlay on stat cards
$scope.goToScoreCard = (scoreCardId) => {
    $location.url(`/ScoreCard/${scoreCardId}`);
};

$scope.goToSingleStats = (scoreCardId) => {
    $location.url(`/Stats/${scoreCardId}`);
};
});
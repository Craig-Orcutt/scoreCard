'use strict';

angular
.module('score')
.controller('AllStatsCtrl', function($scope, ScoreCardFactory){
    $scope.RoundData = {};
    $scope.RoundDates = [];
    $scope.RoundScores = [];

    ScoreCardFactory.getAllScoreCards()
    .then(({data})=>{

        
        // pushing data into empty array
        $scope.RoundData = Object.entries(data);
// TODO keeps coming back as undefined

        
            $scope.RoundData.forEach((element)=>{
                $scope.RoundDates.push(element[1].date);
                $scope.RoundScores.push(element[1].roundScore);

                
            });

        $scope.AllScoresAverage = _.mean($scope.RoundScores).toFixed(2);    

        // setting array to x axis
        $scope.labels = $scope.RoundDates;
        $scope.series = ['Series A'];
    //   setting array to y axis
        $scope.data = [
            $scope.RoundScores
        ];
// colors for graph
            $scope.colors = [{ 
                    borderColor:  'rgba(225, 128, 81, 0.7)',
                    backgroundColor:'rgb(201, 81, 53)',
                    borderWidth: 5
                }];

// options for x and y axes
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
			barThickness: 50,
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
    
    

});
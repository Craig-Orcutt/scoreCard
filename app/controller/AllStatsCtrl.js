'use strict';

angular
.module('score')
.controller('AllStatsCtrl', function($scope, ScoreCardFactory){
    $scope.RoundData = {};
    $scope.RoundDates = [];
    $scope.RoundScores = [];

    ScoreCardFactory.getAllScoreCards()
    .then(({data})=>{
        console.log('data', data);
        console.log('datadddd', data.data);
        
        // pushing data into empty array
        $scope.RoundData = Object.entries(data);
// TODO keeps coming back as undefined
        console.log('Scope', $scope.RoundData);
        
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
    borderColor: 'rgba(204, 118, 161, 1)',
    backgroundColor: 'rgba(135, 179, 141, 1)',
}];

// options for x and y axes
$scope.labelOptions = {

    scales: { 
        yAxes: [{
            ticks: {
                fontColor: "white",
                fontSize : 20,
                stepSize: 5,
                beginAtZero: true
            }
        }],
        xAxes : [{
            ticks: {
                fontColor: 'white',
                fontSize: 15,
                fontFamily: 'Futura'
            }
        }]
    }
};
    
        

        console.log('looo', $scope.LoRound);
        
    });
    
    

});
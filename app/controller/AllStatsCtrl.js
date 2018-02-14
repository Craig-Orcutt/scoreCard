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
            console.log('scores', $scope.RoundScores);
            console.log('dates', $scope.RoundDates);
            $scope.RoundScores.push(0);
        // setting array to x axis
        $scope.labels = $scope.RoundDates;
        $scope.series = ['Series A'];
    //   setting array to y axis
        $scope.data = [
            $scope.RoundScores
        ];
// not sure what but im supposed to have it
        $scope.barDatasetOverride = [
            {
                label: "Bar chart",
                borderWidth: 1,
                type: 'bar'
            }
        ];
    
        

        console.log('looo', $scope.LoRound);
        
    });
    
    

});
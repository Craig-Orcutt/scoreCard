'use strict';

angular
.module('score')
.controller('SingleStats', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route){
    console.log('heyyyy');


    $scope.StatData = [];


    // switch case to sort pars birdies bogies etc..
    function SwitchData(data) {
        data.forEach((element)=>{
            switch(element.score){
                case element.par -3:
                $scope.StatData.push('albatross');
                break;

                case element.par -2:
                $scope.StatData.push(`eagle`);
                break;

                case element.par -1:
                $scope.StatData.push(`birdie`);
                break;

                case element.par: 
                $scope.StatData.push(`par`);
                break;

                case element.par +1:
                $scope.StatData.push(`bogie`);
                break;

                case element.par +2:
                $scope.StatData.push(`doubleBogie`);
                break;

                default:
                $scope.StatData.push(`bad`);
                break;
            }
        });
    }

    // gets scores for current scorecard
        ScoreCardFactory.getSavedScore($routeParams.id)
            .then(({data})=>{
                console.log('data', data);
               new SwitchData(data);
            
            console.log('statdat', $scope.StatData);
            $scope.LoCount = _.countBy($scope.StatData);
            console.log('LoCount', $scope.LoCount);
        });
        
        
});
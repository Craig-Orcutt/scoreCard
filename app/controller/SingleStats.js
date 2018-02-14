'use strict';

angular
.module('score')
.controller('SingleStats', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route){
    console.log('heyyyy');


    $scope.StatData = [];
    $scope.LoCount = [];

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
                // once again filters out null data
                let scores = [];
                scores =  data.filter(hole =>{
                    if(hole !== null){
                        return hole;
                        }
                    });
               new SwitchData(scores);
            
               
               // using loDash to count up birdies bogies etc
               $scope.LoCount = _.countBy($scope.StatData);
               

            // set arrays for keys and values
            let ScoreKey = Object.keys($scope.LoCount);
            console.log('keys', ScoreKey);
            let ScoreVal = Object.values($scope.LoCount);
            ScoreVal.push(0);
            console.log('vals', ScoreVal);
            
// setting array to x axis
            $scope.labels = ScoreKey;
            // $scope.series = ['Series A'];
        //   setting array to y axis
            $scope.data = [
                ScoreVal
            ];

            $scope.colors = [{ 
                    borderColor: 'rgba(204, 118, 161, 1)',
                    backgroundColor: 'rgba(135, 179, 141, 1)',
              }];
            // $scope.chartOptions = 
// not sure what but im supposed to have it
            $scope.barDatasetOverride = [
                {
                    label: "Bar chart",
                    borderWidth: 1,
                    type: 'bar'
                }
            ];
        });
        
 
        
});
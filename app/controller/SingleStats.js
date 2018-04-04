'use strict';

angular
.module('score')
.controller('SingleStats', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route, $location){
    $scope.StatData = [];
    $scope.LoCount = [];

    $scope.UserStats =  () => {        
        $location.url(`/Stats/`);
    };
    // switch case to sort pars birdies bogies etc..
    function SwitchData(data) {
        data.forEach((element)=>{
            switch(element.score){
                case element.par -3:
                $scope.StatData.push('Albatross');
                break;

                case element.par -2:
                $scope.StatData.push(`Eagle`);
                break;

                case element.par -1:
                $scope.StatData.push(`Birdie`);
                break;

                case element.par: 
                $scope.StatData.push(`Par`);
                break;

                case element.par +1:
                $scope.StatData.push(`Bogie`);
                break;

                case element.par +2:
                $scope.StatData.push(`Double Bogie`);
                break;

                default:
                $scope.StatData.push(`Bad`);
                break;
            }
        });
    }

    // gets scores for current scorecard
    ScoreCardFactory.getSavedScore($routeParams.id)
        .then((data)=>{
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
        let ScoreVal = Object.values($scope.LoCount);
        // setting array to x axis
        $scope.labels = ScoreKey;
        //   setting array to y axis
        $scope.data = [
            ScoreVal
        ];
        // set colors of bar graph
        $scope.colors = [{ 
                borderColor:  'rgba(225, 128, 81, 0.7)',
                backgroundColor:'rgb(201, 81, 53)',
                borderWidth: 5
            }];
        // options for labels on x an y axes 
    $scope.labelOptions = {
        maintainAspectRatio: false,
        scales: { 
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    beginAtZero: true
                },                            
                gridLines:{
                display:true,
                }
            }],
            xAxes : [{
                stacked: true,
                gridLines:{
                            display:true,
                        },
                ticks: {
                    fontColor: 'white',
                    fontFamily: 'Futura'
                }
            }]
        }
    };
});
        

        
});
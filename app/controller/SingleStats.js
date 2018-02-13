'use strict';

angular
.module('score')
.controller('SingleStats', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route){
    console.log('heyyyy');

    $scope.StatData = [];
    $scope.AlbatrossData =[];
    $scope.ParData = {
        albatross: '',
        eagle: '',
        birdie: '',
        par: '',
        bogie: '',
        doubleBogie: '',
        bad: ''
    };
    $scope.BirdieData = [];

    // ScoreCardFactory.getSavedScore($routeParams.id)
    //     .then(({data})=>{
    //         console.log('data', data);
    //         data.forEach((element)=>{
    //             if(element.score === element.par -2 ){
    //                 $scope.AlbatrossData.push(element.par);
    //             }else if(element.score === element.par -1){
    //                 $scope.BirdieData.push(element.par);
    //             }
    //             else if(element.score === element.par);
    //                 $scope.ParData.par += `${element.score} ,`  ;
    //         });

    //     });

    
        ScoreCardFactory.getSavedScore($routeParams.id)
            .then(({data})=>{
                console.log('data', data);
                data.forEach((element)=>{
                    switch(element.score){
                        case element.par -3:
                        $scope.ParData.albatross += element.score;
                        break;
                        case element.par -2:
                        $scope.ParData.eagle += element.score;
                        break;
                        case element.par -1:
                        $scope.ParData.birdie += element.score;
                        break;
                        case element.par: 
                        $scope.ParData.par += element.score;
                        break;
                        case element.par +1:
                        $scope.ParData.bogie += element.score;
                        break;
                        case element.par +2:
                        $scope.ParData.doubleBogie += element.score;
                        break;
                        default:
                        $scope.ParData.bad += element.score;
                        break;
                    }
            });
            console.log('statdat', $scope.ParData);
        });
        let hapDat = _.countBy($scope.ParData);
        console.log('hap', hapDat);
        
        
});
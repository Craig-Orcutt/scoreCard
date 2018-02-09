'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams){
    console.log('route', $routeParams.id);
    
    $scope.Score = {
        SID : '',
        HID : '',
        score : '',
        ScoreCardID : ''
    };

    ScoreCardFactory.getSingleScoreCard($routeParams.id)
    .then((data)=>{
        console.log('what', data.data.GCID);
        let currentGCID = data.data.GCID;
    return GolfCourseFactory.getHoleData(currentGCID)
    .then((data)=>{
        $scope.HoleInfo = data;
        
        });
    });



    
    // GolfCourseFactory.getHoleData()
    // .then((data)=>{

    //     $scope.HoleInfo = data;
    //     });
});
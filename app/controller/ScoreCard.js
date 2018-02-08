'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory, GolfCourseFactory){
    
    $scope.Score = {
        SID : '',
        HID : '',
        score : '',
        ScoreCardID : ''
    };
    GolfCourseFactory.getHoleData()
    .then((data)=>{
        $scope.HoleInfo = data;
        });
        
});
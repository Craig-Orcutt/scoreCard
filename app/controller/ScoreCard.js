'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory, GolfCourseFactory){
    
    $scope.CardYards = {
        yards: ''
    };
    GolfCourseFactory.getHoleData()
    .then((data)=>{
        $scope.HoleInfo = data;
        });
        
});
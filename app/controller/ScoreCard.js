'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory){
    ScoreCardFactory.getCourseData()
    .then((data)=>{
        console.log(data.data.golfCourse);
    })
    .catch((err)=>{
        console.log('err',err );
        
    });
    
});
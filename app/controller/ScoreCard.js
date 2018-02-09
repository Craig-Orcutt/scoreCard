'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams){

    
    $scope.Score = {
        SID : '',
        HID : '',
        score : '',
        ScoreCardID : ''
    };

    

    ScoreCardFactory.getSingleScoreCard($routeParams.id)
    .then((data)=>{
        $scope.currentGCID = data.data.GCID;
        return GolfCourseFactory.getHoleData($scope.currentGCID)
        .then((data)=>{
            $scope.HoleInfo = data;
            
        });
    });
    

        
    $scope.NewScore = () =>{  

    ScoreCardFactory.getSingleScoreCard($routeParams.id)
        .then((data)=>{
        let currentGCID = data.data.GCID;
        return GolfCourseFactory.getHoleData(currentGCID)
        .then((data)=>{
            $scope.Score.HID = data.holeNumber;
            $scope.Score.ScoreCardID = $routeParams.id;
            console.log('gcid', currentGCID);
        GolfCourseFactory.saveScore($scope.Score)
        .then((data)=>{
            console.log('score saved', data );
            
            });  
        });
    });

};


    



    
    // GolfCourseFactory.getHoleData()
    // .then((data)=>{

    //     $scope.HoleInfo = data;
    //     });
});
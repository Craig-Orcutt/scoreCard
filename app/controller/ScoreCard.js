'use strict';

angular
.module('score')
.controller('ScoreCard', function($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route){

    
    $scope.Score = {
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
            $scope.HoleInfo.ScoreCardID = $routeParams.id;
            
        });
    });
    

    // function forScoreObj () {
    //     $scope.holeArray = Object.entries($scope.HoleInfo);
    //     console.log('holeobj',holeArray);


        // holeObj.forEach((data)=>{
        //     $scope.Score.par = data[1].par;
        //     $scope.Score.HID = data[1].holeNumber;


        //     console.log('HID', $scope.Score.ScoreCardID);
            
            
        // });
        
    // }
        
    // $scope.NewScore = () =>{  

    // ScoreCardFactory.getSingleScoreCard($routeParams.id)
    //     .then((data)=>{
    //     $scope.currentGCID = data.data.GCID;
    //     return GolfCourseFactory.getHoleData($scope.currentGCID)
    //     .then((data)=>{
    //         $scope.ScoreCollection.HID = data.holeNumber;
    //         $scope.ScoreCollection.ScoreCardID = $routeParams.id;
    //         console.log('hey', data[24]);
    //     return GolfCourseFactory.saveScore($scope.ScoreCollection)
    //     .then((data)=>{
    //         console.log('score saved', data );
            
    //         });  
    //     });
    // });
// };

$scope.NewScore = () =>{  
    console.log('score', $scope.HoleInfo);
    // $scope.HoleInfo.ScoreCardID = $routeParams.id;
    ScoreCardFactory.saveScore($scope.HoleInfo)
    .then((data)=>{
        // console.log('gcid', currentGCID);
        $route.reload();
        ScoreCardFactory.getSavedScore($scope.HoleInfo)
        .then((data)=>{
            console.log('getsavedScore', data );
            
        });
        
        });  

}; 



    
    // GolfCourseFactory.getHoleData()
    // .then((data)=>{

    //     $scope.HoleInfo = data;
    //     });
});
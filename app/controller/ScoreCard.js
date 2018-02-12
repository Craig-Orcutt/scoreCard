'use strict';

angular
    .module('score')
    .controller('ScoreCard', function ($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route) {


        $scope.HoleInfo = {
            score : ''
        };

        
        
        ScoreCardFactory.getSingleScoreCard($routeParams.id)
        .then((data) => {
            // checks to see if there is saved scores that match the id of the scorecard
            console.log('SINGLECARDCTRL', data);
            
            $scope.currentGCID = data.data.GCID;
            ScoreCardFactory.getSavedScore($routeParams.id)
            .then((data)=>{
                console.log('SAVEDSCORECTRL', data );
                
                
                // if theres is data and is not null, use this as the data to set the HoleInfo
                if (data.data){
                    console.log('IFSAVEDSCORE',data.data );
                    
                    let holes =  data.data.filter(hole =>{
                        if(hole !== null){
                            return hole;
                        }
                    });
                    return holes;
                }
                // else just get the holes that match the GCID to the GCID on the scorecard
                return GolfCourseFactory.getHoleData($scope.currentGCID);
            })
            .then((data) => {
                console.log('HOLEINFODATA',data );
                
            //    HoleInfo is the data being sent to the partial to populate the page
                $scope.HoleInfo = data;
                
                
                });
            });

        $scope.NewScore = () => {
            
            // holeifo adds the key of ScoreCardId as well as a $$haskey which later needs to be removed in the saved score. why?
            console.log('NEWSCOREHOLEINFO', $scope.HoleInfo);
            
            
            Object.keys($scope.HoleInfo).forEach((element) => {
                
                $scope.HoleInfo[element].ScoreCardID = $routeParams.id;
                // console.log('keys', holeInfo[element].ScoreCardID);
                
                
                
            });
            console.log('KEYSINFO', $scope.HoleInfo);
            
            // saves score and sets id of object to match with the id of the scorecard
            ScoreCardFactory.saveScore($scope.HoleInfo, $routeParams.id)
                .then((data) => {
                    console.log('SAVESCORECTRL', data );
                    
                });

        };
    });
'use strict';

angular
    .module('score')
    .controller('ScoreCard', function ($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route) {


        $scope.Score = {
            HID: '',
            score: '',
            ScoreCardID: ''
        };

        
        
        ScoreCardFactory.getSingleScoreCard($routeParams.id)
        .then((data) => {
            $scope.currentGCID = data.data.GCID;
            // checks to see if there is saved scores that match the id of the scorecard
            ScoreCardFactory.getSavedScore($routeParams.id)
            .then((data)=>{
                // if theres is data and is not null, use this as the data to set the HoleInfo
                if (data.data){
                    return data.data;
                }
                // else just get the holes that match the GCID to the GCID on the scorecard
                return GolfCourseFactory.getHoleData($scope.currentGCID);
            })
            .then((data) => {
            //    HoleInfo is the data being sent to the partial to populate the page
                console.log('singleCour ', data);
                $scope.HoleInfo = data;
                });
            });

        $scope.NewScore = () => {
            let holeInfo = $scope.HoleInfo;
            // holeifo adds the key of ScoreCardId as well as a $$haskey which later needs to be removed in the saved score. why?
            Object.keys(holeInfo).forEach((element) => {
                holeInfo[element].ScoreCardID = $routeParams.id;
            });
            // saves score and sets id of object to match with the id of the scorecard
            ScoreCardFactory.saveScore(holeInfo, $routeParams.id)
                .then((data) => {
                    console.log('holeScore', data);                    
                });

        };
    });
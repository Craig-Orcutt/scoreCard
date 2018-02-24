'use strict';

angular
    .module('score')
    .controller('ScoreCard', function ($scope, ScoreCardFactory, GolfCourseFactory, $routeParams, $route, $location) {

        $scope.HoleInfo = {
            score : 0
        };

        $scope.ScoreCard = {
            roundScore : '',
            GCID : '',
            date : '',
            name : '',
            uid : ''
        };

// returns to score Card List
        $scope.goToScoreList= () => {
            $location.url(`/ScoreCardList`);
        };


    ScoreCardFactory.getSingleScoreCard($routeParams.id)
        .then((data) => {
        // checks to see if there is saved scores that match the id of the scorecard
        $scope.ScoreCard = data.data;


        ScoreCardFactory.getSavedScore($routeParams.id)
        .then((data)=>{
            // if theres is data and is not null, use this as the data to set the HoleInfo
            if (data){
                // Filters out data that is null
                let holes =  data.filter(hole =>{
                    if(hole !== null){
                        return hole;
                    }
                });
                return holes;
            }
            // else just get the holes that match the GCID to the GCID on the scorecard
            return GolfCourseFactory.getHoleData($scope.ScoreCard.GCID);
        })
        .then((data) => {
            //    HoleInfo is the data being sent to the partial to populate the page
            $scope.HoleInfo = data;
            $scope.NewTotal();
            
            
        });
    });
    
    $scope.NewScore = () => {
        // holeifo adds the key of ScoreCardId as well as a $$haskey which later needs to be removed in the saved score. why?
        Object.keys($scope.HoleInfo).forEach((element) => {
            $scope.HoleInfo[element].ScoreCardID = $routeParams.id;        
        });        
        // saves score and sets id of object to match with the id of the scorecard
        ScoreCardFactory.saveScore($scope.HoleInfo, $routeParams.id)
        .then((data) => {

        });
        
    };

    // function to add to total
    $scope.NewTotal = () => {
// uses factory call to get the collection of scores
    ScoreCardFactory.getSavedScore($routeParams.id)
        .then((data)=>{
        let scores = [];       
        if (data){      
            // Filters out data that is null
                scores =  data.filter(hole =>{
                if(hole !== null){
                    return hole;
                    }
                });
            }
        // declares ScoreTotal to scope
            $scope.ScoreTotal =  {
            Total : 0
                };
// loops over each score object and add the object.score to Total
            scores.forEach((element)=>{
                if(element.score !==  undefined){
                $scope.ScoreTotal.Total = $scope.ScoreTotal.Total + element.score;
            }
        });
        
        // $scope.RoundScore = {
            //     roundScore: 0,
            //     ScoreCard : $routeParams.id
            // };
            $scope.ScoreCard.roundScore = $scope.ScoreTotal.Total;             
            ScoreCardFactory.addScoreTotalToCard($routeParams.id, $scope.ScoreCard)
            .then((data)=>{
            });
        });
    }; 
    
    

});
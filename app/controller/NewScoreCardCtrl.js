'use strict';

angular
.module('score')
.controller('NewScoreCardCtrl', function($scope, ScoreCardFactory, $window){

$scope.ScoreCard = {
    date: '',
    course : ''
};

    $scope.CreateScoreCard = () => {
        console.log('button clicked');
        
        $scope.ScoreCard.uid = firebase.auth().currentUser.uid;
        ScoreCardFactory.addNewScoreCard($scope.ScoreCard)
        .then((data) => {
            console.log('scoreCard Added in Controller', data );
            $window.location.href = '#!/ScoreCardList';
        });
    };

});
'use strict';

angular
    .module('score')
    .controller('ScoreCardList', function ($scope, $route, ScoreCardFactory, $location, AuthFactory, GolfCourseFactory) {
        //    object for the scorecard
        $scope.ScoreCard = {
            date: '',
            GCID: '',
            name: '',
        };

        $scope.CourseDropDown = {
            name : ''
        };


        $scope.courseSelect = (course) => {
            GolfCourseFactory.getSingleCourseSelect(course)
                .then((data) => {
                    $scope.ScoreCard.name = data[0].name;
                    $scope.ScoreCard.GCID = data[0].GCID;
                    $scope.ScoreCard.img = data[0].courseImg;
                });

        };

        // get course data to setup the dropdown menu and get the course IDS for each course
        GolfCourseFactory.getAllCourseData()
            .then((data) => {
                $scope.CourseList = data.data;
                $scope.CourseDropDown.name  = data.data[0].name;
            });



        // creates scoreCard by plugin in the object created in the form and plugging in the UID of the current user
        $scope.CreateScoreCard = () => {

            $scope.ScoreCard.uid = firebase.auth().currentUser.uid;
            ScoreCardFactory.addNewScoreCard($scope.ScoreCard)
                .then((data) => {
                    $route.reload();
                });
        };



        // gets score cards by first checking if the user is logged in and then calling the factory and bringing back only scorecards associated with that user
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                ScoreCardFactory.getScoreCardList(user.uid)
                    .then((data) => {
                        $scope.AllScoreCards = data;
                        
                        // GolfCourseFactory.getCourseData()
                    });
            } else {
                console.log('err');
            }
        });

        // deletes scorecard using the id of the scorecard object 
        $scope.deleteScoreCard = (scoreCardId) => {
            ScoreCardFactory.deleteScoreCard(scoreCardId)
                .then(() => {
                    ScoreCardFactory.getScoreCardList();
                    $route.reload();
                });
        };

        // sets the url for the scorecard by taking the id from that scorecard object
        $scope.goToScoreCard = (scoreCardId) => {
            $location.url(`/ScoreCard/${scoreCardId}`);
        };
    });
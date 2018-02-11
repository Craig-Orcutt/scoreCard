'use strict';

angular
    .module('score')
    .factory('ScoreCardFactory', function (FBUrl, $q, $http) {

        function addNewScoreCard(scoreCardObj) {
            return $q((resolve, reject) => {
                $http
                    .post(`${FBUrl}scoreCards.json`, JSON.stringify(scoreCardObj))
                    .then(data => {
                        console.log('new scorecard Added', data.data);
                        resolve(data.data);
                    });
            });
        }

        function getScoreCardList(scoreCardID) {
            return $q((resolve, reject) => {
                $http
                    .get(`${FBUrl}scoreCards.json?orderBy="uid"&equalTo="${scoreCardID}"`)
                    .then(({ data }) => {
                        let scoreCardArr = Object.keys(data).map(cardKey => {
                            data[cardKey].id = cardKey;
                            return data[cardKey];
                        });
                        resolve(scoreCardArr);
                    });
            });
        }

        function deleteScoreCard(scoreCardID) {
            return $q((resolve, reject) => {
                $http
                    .delete(`${FBUrl}scoreCards/${scoreCardID}.json`)
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }

        function getSingleScoreCard(scoreCardID) {
            return $q((resolve, reject) => {
                $http
                    .get(`${FBUrl}scoreCards/${scoreCardID}.json`)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }

        function saveScore(scoreObj, scoreCardID) {
            //  removes $$hashkey key from object. Why tho??
             Object.keys(scoreObj).forEach(key => {
                delete scoreObj[key].$$hashKey;
            });
                return $q((resolve, reject) => {
                    $http
                    // put, adds the ScoreObj to the score Obj collection that matches with the scorecardID
                        .put(`${FBUrl}scores/${scoreCardID}.json`, JSON.stringify(scoreObj))
                        .then(data => {
                            console.log('new score Added', data.data);
                            resolve(data.data);
                        });
                });
        }

        function getSavedScore(scoreCardID) {
            return $q((resolve, reject) => {
                $http
                    .get(`${FBUrl}scores/${scoreCardID}.json`)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }

        // function updateScoreCard(scoreCardID, newScore) {
        //     return $q((resolve, reject) => {
        //         $http
        //             .patch(`${FBUrl}score/${scoreCardID}.json`, JSON.stringify(newScore))
        //             .then(data => {
        //                 console.log('new score Added', data.data);
        //                 resolve(data.data);
        //             });
        //     });
        // }

        return { addNewScoreCard, getScoreCardList, deleteScoreCard, getSingleScoreCard, saveScore, getSavedScore};
    });
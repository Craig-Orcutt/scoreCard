'use strict';

angular
    .module('score')
    .factory('ScoreCardFactory', function (FBUrl, $q, $http) {

        function addNewScoreCard(scoreCardObj) {
            return $q((resolve, reject) => {
                $http
                    .post(`${FBUrl}scoreCards.json`, JSON.stringify(scoreCardObj))
                    .then(data => {
                        resolve(data.data);
                    });
            });
        }

        function addScoreTotalToCard(scoreCardID, scoreCardObj) {
            return $q((resolve, reject) => {
                $http
                    .put(`${FBUrl}scoreCards/${scoreCardID}.json`, JSON.stringify(scoreCardObj))
                    .then(data => {
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

        function getSingleScoreCard(scoreCardID, currentGCID) {
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
                            resolve(data.data);
                        });
                });
        }

        function getSavedScore(scoreCardID) {
            return $q((resolve, reject) => {
                let savedScores;
                $http
                    .get(`${FBUrl}scores/${scoreCardID}.json`)
                    .then(({data}) => {

                        // if there is null data and if the type of data is an object, assign data to variable savedscores. for some reason the data was occasionally coming back as an object of objects instead of an array of objects. this solves that problem. 
                        if(data !== null){
                            if(typeof data === "object"){
                               savedScores = Object.values(data);
                            }
                        }
                        resolve(savedScores);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
        function getAllScoreCards() {
            return $q((resolve, reject) => {
                $http
                    .get(`${FBUrl}scoreCards.json`)
                    .then((data) => {
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }


        return { addNewScoreCard, getScoreCardList, deleteScoreCard, getSingleScoreCard, saveScore, getSavedScore, addScoreTotalToCard, getAllScoreCards};
    });
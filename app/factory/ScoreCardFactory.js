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


        return { addNewScoreCard, getScoreCardList, deleteScoreCard };
    });
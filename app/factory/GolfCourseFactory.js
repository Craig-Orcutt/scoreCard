'use strict';

angular
.module('score')
.factory('GolfCourseFactory', function (FBUrl , $q , $http){

    function getCourseData() {
        return $q((resolve, reject)=>{
            $http
            .get(`${FBUrl}golfCourse.json`)
            .then((data)=>{
                resolve(data.data[0]);
            })
            .catch((err)=>{
                reject(err);
            });
        });
    }

    // function getGolfCourse(scoreCardGCID) {
    //     return $q((resolve, reject) => {
    //         $http
    //             .get(`${FBUrl}golfCourse/${scoreCardGCID}`)
    //             .then(({ data }) => {
    //                 let scoreCardArr = Object.keys(data).map(cardKey => {
    //                     data[cardKey].id = cardKey;
    //                     return data[cardKey];
    //                 });
    //                 resolve(scoreCardArr);
    //             });
    //     });
    // }
return { getCourseData };
});
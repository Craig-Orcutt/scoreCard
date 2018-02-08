'use strict';

angular
.module('score')
.factory('GolfCourseFactory', function (FBUrl , $q , $http){

    function getCourseData() {
        return $q((resolve, reject)=>{
            $http
            .get(`${FBUrl}golfCourse.json`)
            .then((data)=>{
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            });
        });
    }

    function getHoleData() {
        return $q ((resolve, reject)=>{
            $http
            .get(`${FBUrl}holes.json`)
            .then(({data})=>{
                console.log('holes', data);
            resolve(data);
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
return { getCourseData , getHoleData };
});
'use strict';

angular
.module('score')
.factory('GolfCourseFactory', function (FBUrl , $q , $http){

    function getAllCourseData() {
        return $q((resolve, reject)=>{
            $http
            .get(`${FBUrl}golfCourse.json`)
            .then((data)=>{
                console.log('courses', data);
                
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            });
        });
    }

    function getSingleCourseSelect(name) {
        return $q((resolve, reject)=>{
            $http
            .get(`${FBUrl}golfCourse.json?orderBy="name"&equalTo="${name}"`)
            .then(({data})=>{
                let courseArr = Object.keys(data).map(courseKey => {
                    data[courseKey].id = courseKey;
                    return data[courseKey];
                });
                resolve(courseArr);
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
return { getAllCourseData , getHoleData, getSingleCourseSelect };
});
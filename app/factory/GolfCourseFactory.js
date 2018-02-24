'use strict';

angular
.module('score')
.factory('GolfCourseFactory', function (FBUrl , $q , $http){

    function getAllCourseData() {
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

    function getHoleData(courseID) {
        return $q ((resolve, reject)=>{
            $http
            .get(`${FBUrl}holes.json?orderBy="GCID"&equalTo=${courseID}`)
            .then(({data})=>{
                resolve(data);
            });
        });
    }

return { getAllCourseData , getHoleData, getSingleCourseSelect };
});
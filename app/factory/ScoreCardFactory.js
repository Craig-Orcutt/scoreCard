'use strict';

angular
.module('score')
.factory('ScoreCardFactory', function (FBUrl , $q , $http){

    function getCourseData() {
        return $q((resolve, reject)=>{
            $http
            .get(`${FBUrl}courseInfo.json`)
            .then((data)=>{
                console.log('data',data );
                
                resolve(data);
            })
            .catch((err)=>{
                reject(err);
            });
        });
    }

return { getCourseData };
});
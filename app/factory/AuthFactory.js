'use strict';

angular
    .module('score')
    .factory('AuthFactory', (FBCreds, $q) => {
        let currentUser = null;
        const provider = new firebase.auth.GoogleAuthProvider();
        // LOG IN WITH GOOGLE
        let googleLogin = () => {
            return firebase
                .auth()
                .signInWithPopup(provider);
        };
        // LOGOUT WITH GOOGLE
        let googleLogout = () => {
            return firebase.auth().signOut();
          };
// Check to see if current user is logged in
        function isLoggedIn() {
            return $q((resolve, reject) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        currentUser = user.uid;
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        }

        return { googleLogin , isLoggedIn, googleLogout };
    });
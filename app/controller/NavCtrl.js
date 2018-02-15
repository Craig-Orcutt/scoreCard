'use strict';

angular
    .module('score')
    .controller("NavCtrl", function ($scope, $window, AuthFactory) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                $scope.$apply(($scope.isLoggedIn = true));
            } else {
                $scope.isLoggedIn = false;
                $scope.$apply(); //this is to make it update scope

                $window.location.href = "#!/login";
            }
        });

        

            $scope.homePage = {
                name: "Home",
                url: "#!/Home"
            };
            $scope.roundPage = {
                name: "Rounds",
                url: "#!/ScoreCardList"
            };
            $scope.statsPage ={
                name: "Stats",
                url: '#!/Stats'

            };
            $scope.logOut = {
                name: "Logout",
                url: "#!/logout"
            };
        

        $scope.navLink = navUrl => {
            if (navUrl === "#!/logout") {
                AuthFactory.googleLogout();
            } else {
                $window.location.href = navUrl;
                // $route.reload();

            }
        };
    });

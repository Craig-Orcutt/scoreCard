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

        $scope.navItems = [

            {
                name: "Home",
                url: "#!/Home"
            },
            {
                name: "Rounds",
                url: "#!/ScoreCardList"
            },
            {
                name: "Stats",
                url: '#!/Stats'

            },
            {
                name: "Logout",
                url: "#!/logout"
            }
        ];

        $scope.navLink = navUrl => {
            if (navUrl === "#!/logout") {
                AuthFactory.googleLogout();
            } else {
                $window.location.href = navUrl;
                // $route.reload();

            }
        };
    });

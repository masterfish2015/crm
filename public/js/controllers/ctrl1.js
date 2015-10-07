var crmApp = angular.module('crmApp',['ngRoute'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
            //route for the home page
            .when('/',{
                templateUrl: "/views/home.html",
                controller : "homeController"
            })
            //route for the login page
            .when('/login',{
                templateUrl: "/views/login.html",
                controller : "loginController"
            });
    }]);

crmApp.controller('ctrl1',function($scope){
    $scope.phones = [
        {name: "Nexus S", snippet:'Fast just...'},
        {name: "Motorola XOOM", snippet:'The next...'}
    ];
});

crmApp.controller('homeController', function($scope){
    $scope.message = "欢迎大家访问本网站！";
});

crmApp.controller('loginController', function($scope){
    $scope.message = "欢迎大家访问本网站！";
});

///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMPApp;
(function (UMPApp) {
    var NavigationController = (function (_super) {
        __extends(NavigationController, _super);
        function NavigationController($scope, $routeParams, $timeout, navService, usersService, teacherService, notificationService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                console.log("init navcontroller");
                $scope.notificationActive = false;
                navService.getMyUserType().then(function (d) {
                    console.log(d);
                    $scope.myUserType = d;
                    $scope.godUser = false;
                    $scope.isdUser = false;
                    $scope.districtUser = false;
                    $scope.schoolUser = false;
                    $scope.schoolTeacherUser = false;
                    if (d == 0) {
                        $scope.godUser = true;
                    }
                    else if (d == 4 || d == 7) {
                        $scope.isdUser = true;
                    }
                    else if (d == 3 || d == 6) {
                        $scope.districtUser = true;
                    }
                    else if (d == 2 || d == 5) {
                        $scope.schoolUser = true;
                    }
                    else {
                        $scope.classroomUser = true;
                    }
                });
            };
            $scope.$watch(function () { return navService.currentRoute; }, function (newValue, oldValue) {
                $scope.currentRoute = newValue;
            });
            $scope.$watch(function () { return navService.shouldShowButton; }, function (newValue, oldValue) {
                $scope.shouldShowButton = newValue;
            });
            $scope.$watch(function () { return navService.inUserEdit; }, function (newValue, oldValue) {
                $scope.inUserEdit = newValue;
            });
            $scope.$watch(function () { return navService.inUserNew; }, function (newValue, oldValue) {
                $scope.inUserNew = newValue;
            });
            $scope.$watch(function () { return usersService.filtersActive; }, function (newValue, oldValue) {
                $scope.filtersActive = newValue;
            });
            $scope.$watch(function () { return teacherService.filtersActive; }, function (newValue, oldValue) {
                $scope.filtersActive = newValue;
            });
            $scope.isActive = function (navName) {
                if ($scope.currentRoute.name == "User Management" && navName == "Users") {
                    return true;
                }
                if ($scope.currentRoute.name == "Teacher Lookup" && navName == "Teachers") {
                    return true;
                }
                if ($scope.currentRoute.name == "Bulk Upload" && navName == "Bulk Upload") {
                    return true;
                }
                return false;
            };
            $scope.clearFilters = function () {
                usersService.clearFilters();
                teacherService.clearFilters();
            };
            $scope.postUser = function () {
                navService.postUser();
            };
            $scope.deleteUser = function () {
                usersService.deleteUser($routeParams.userKey).then(function (d) {
                    console.log(d);
                    $scope.modalErrorText = "";
                    $scope.notificationSuccess = true;
                    $scope.notificationText = "Deleted User";
                })
                    .catch(function (response) {
                    console.error('User Deletion Error', response.status, response.data);
                    $scope.modalErrorText = response.data;
                });
            };
            $scope.clearErrorText = function () {
                $scope.modalErrorText = "";
            };
        }
        NavigationController.$inject = ['$scope', '$routeParams', '$timeout', 'navigationService', 'usersService', 'teacherService', 'notificationService'];
        return NavigationController;
    }(BaseController.Controller));
    UMPApp.NavigationController = NavigationController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationController.js.map
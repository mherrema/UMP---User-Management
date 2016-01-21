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
        function NavigationController($scope, navService, usersService, teacherService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
            };
            $scope.$watch(function () { return navService.currentRoute; }, function (newValue, oldValue) {
                $scope.currentRoute = newValue;
            });
            $scope.$watch(function () { return navService.shouldShowButton; }, function (newValue, oldValue) {
                $scope.shouldShowButton = newValue;
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
        }
        NavigationController.$inject = ['$scope', 'navigationService', 'usersService', 'teacherService'];
        return NavigationController;
    })(BaseController.Controller);
    UMPApp.NavigationController = NavigationController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationController.js.map
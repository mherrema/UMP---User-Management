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
        function NavigationController($scope, navService) {
            _super.call(this, $scope);
            var controller = this;
            // navService.goToMainNav();
            $scope.init = function () {
                // $scope.activityItems = activityService.getActivityItems();
                // navService.setCurrentRoute({ route: {name: 'Activity', url: "#/activity"}});
                // $scope.actionsShown = new Array < boolean >();
                // $scope.activityItems.forEach(s => {
                //   $scope.actionsShown.push(false);
                // });
                // controller.setActionsShown($scope.actionsShown);
            };
            $scope.$watch(function () { return navService.currentRoute; }, function (newValue, oldValue) {
                $scope.currentRoute = newValue;
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
        }
        NavigationController.$inject = ['$scope', 'navigationService'];
        return NavigationController;
    })(BaseController.Controller);
    UMPApp.NavigationController = NavigationController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationController.js.map
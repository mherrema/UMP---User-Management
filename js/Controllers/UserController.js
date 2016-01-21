///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMPApp;
(function (UMPApp) {
    var UserController = (function (_super) {
        __extends(UserController, _super);
        function UserController($scope, navService) {
            _super.call(this, $scope);
            var controller = this;
            // navService.goToMainNav();
            $scope.init = function () {
                navService.setCurrentRoute({ name: "User Management" });
                $scope.districtArray = [
                    { id: 0, name: 'Select District' },
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.selectedDistrict = $scope.districtArray[0];
                $scope.userTypeArray = [
                    { id: 0, name: 'Select User Type' },
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.selectedUserType = $scope.userTypeArray[0];
                // $scope.activityItems = activityService.getActivityItems();
                // navService.setCurrentRoute({ route: {name: 'Activity', url: "#/activity"}});
                // $scope.actionsShown = new Array < boolean >();
                // $scope.activityItems.forEach(s => {
                //   $scope.actionsShown.push(false);
                // });
                // controller.setActionsShown($scope.actionsShown);
            };
        }
        UserController.$inject = ['$scope', 'navigationService'];
        return UserController;
    })(BaseController.Controller);
    UMPApp.UserController = UserController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UserController.js.map
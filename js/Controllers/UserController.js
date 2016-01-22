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
        function UserController($scope, navService, usersService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Edit User" });
                $scope.hidePasswordFields = true;
            };
            $scope.toggleShowPassword = function () {
                $scope.hidePasswordFields = !$scope.hidePasswordFields;
            };
        }
        UserController.$inject = ['$scope', 'navigationService', 'usersService'];
        return UserController;
    })(BaseController.Controller);
    UMPApp.UserController = UserController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UserController.js.map
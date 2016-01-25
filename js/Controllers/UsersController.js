///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMPApp;
(function (UMPApp) {
    var UsersController = (function (_super) {
        __extends(UsersController, _super);
        function UsersController($scope, navService, usersService) {
            _super.call(this, $scope);
            var controller = this;
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
                this.searchInput = "";
                $scope.users = [];
                $scope.users = [{
                        id: 1,
                        name: "Byron Center School",
                        username: "bcschool@fake.com",
                        email: "bcschool@fake.com",
                        lastLogin: "1/15/2016 7:58 PM",
                        lockedOut: "No",
                        roles: "Byron Center School Users"
                    },
                    {
                        id: 2,
                        name: "Byron Center School",
                        username: "bcschool@fake.com",
                        email: "bcschool@fake.com",
                        lastLogin: "1/15/2016 7:58 PM",
                        lockedOut: "No",
                        roles: "Byron Center School Users"
                    },
                    {
                        id: 3,
                        name: "Byron Center School",
                        username: "bcschool@fake.com",
                        email: "bcschool@fake.com",
                        lastLogin: "1/15/2016 7:58 PM",
                        lockedOut: "No",
                        roles: "Byron Center School Users"
                    },
                    {
                        id: 4,
                        name: "Byron Center School",
                        username: "bcschool@fake.com",
                        email: "bcschool@fake.com",
                        lastLogin: "1/15/2016 7:58 PM",
                        lockedOut: "No",
                        roles: "Byron Center School Users"
                    }];
                if (navService.currentUserFilter.searchInput != "") {
                    $scope.searchInput = navService.currentUserFilter.searchInput;
                }
                if (navService.currentUserFilter.district.id != 0) {
                    $scope.selectedDistrict = navService.currentUserFilter.district;
                }
                if (navService.currentUserFilter.userType.id != 0) {
                    $scope.selectedUserType = navService.currentUserFilter.userType;
                }
            };
            $scope.$watch(function () { return usersService.shouldClearFilters; }, function (newValue, oldValue) {
                if (newValue) {
                    $scope.searchInput = "";
                    $scope.selectedDistrict = { id: 0, name: "Select District" };
                    $scope.selectedUserType = { id: 0, name: "Select User Type" };
                    usersService.clearedFilters();
                }
            });
            $scope.$watch(function () { return $scope.searchInput; }, function (newValue, oldValue) {
                $scope.searchUsers();
            });
            $scope.searchUsers = function () {
                console.log("searching!");
                usersService.searchUsers($scope.searchInput, $scope.selectedDistrict, $scope.selectedUserType);
            };
            $scope.selectDistrict = function (item, model) {
                // if($scope.selectedDistrict != item){
                $scope.searchUsers();
                // }
            };
            $scope.selectUserType = function (item, model) {
                // if($scope.selectedUserType != item){
                $scope.searchUsers();
                // }
            };
        }
        UsersController.$inject = ['$scope', 'navigationService', 'usersService'];
        return UsersController;
    }(BaseController.Controller));
    UMPApp.UsersController = UsersController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersController.js.map
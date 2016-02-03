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
        function UsersController($scope, $http, navService, usersService) {
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
                // $scope.userTypeArray = [
                //   {IgorUserRoleKey: 0, Name: 'Select User Type'},
                //   {id: 1, name: 'first'},
                //   {id: 2, name: 'second'},
                //   {id: 3, name: 'third'},
                //   {id: 4, name: 'fourth'},
                //   {id: 5, name: 'fifth'},
                // ];
                $scope.selectedUserType = { IgorUserRoleKey: 0, Name: 'Select User Type' };
                this.searchInput = "";
                $scope.users = [];
                if (navService.currentUserFilter.searchInput != "") {
                    $scope.searchInput = navService.currentUserFilter.searchInput;
                }
                if (navService.currentUserFilter.district.id != 0) {
                    $scope.selectedDistrict = navService.currentUserFilter.district;
                }
                if (navService.currentUserFilter.userType.IgorUserRoleKey != 0) {
                    $scope.selectedUserType = navService.currentUserFilter.userType;
                }
                // $http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/')
                // .success(function(response: Array<IUser>){
                //   $scope.users = response;
                // });
            };
            $scope.$watch(function () { return usersService.shouldClearFilters; }, function (newValue, oldValue) {
                if (newValue) {
                    $scope.searchInput = "";
                    $scope.selectedDistrict = { id: 0, name: "Select District" };
                    $scope.selectedUserType = { IgorUserRoleKey: 0, Name: "Select User Type" };
                    usersService.clearedFilters();
                }
            });
            $scope.$watch(function () { return $scope.searchInput; }, function (newValue, oldValue) {
                $scope.searchUsers();
            });
            $scope.$watch(function () { return usersService.users; }, function (newValue, oldValue) {
                $scope.users = newValue;
            });
            $scope.searchUsers = function () {
                console.log("searching!");
                usersService.searchUsers($scope.searchInput, $scope.selectedDistrict, $scope.selectedUserType).then(function (d) {
                    console.log(d);
                    $scope.users = d;
                    var users = $scope.users;
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].aspnet_Profile) {
                            var tmpArray = users[i].aspnet_Profile.PropertyNames.split("FullName");
                            tmpArray = tmpArray[1].split(":");
                            var index = parseInt(tmpArray[2]);
                            var length = parseInt(tmpArray[3]);
                            users[i].Name = users[i].aspnet_Profile.PropertyValuesString.substring(index, index + length);
                            console.log(tmpArray);
                        }
                    }
                });
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
        UsersController.$inject = ['$scope', '$http', 'navigationService', 'usersService'];
        return UsersController;
    }(BaseController.Controller));
    UMPApp.UsersController = UsersController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersController.js.map
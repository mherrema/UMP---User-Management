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
        function UserController($scope, $routeParams, navService, usersService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                if ($routeParams.userKey != "" && $routeParams.userKey != undefined) {
                    navService.setCurrentRoute({ name: "Edit User" });
                    $scope.inNewUser = false;
                }
                else {
                    navService.setCurrentRoute({ name: "Add User" });
                    $scope.inNewUser = true;
                }
                $scope.hidePasswordFields = true;
                $scope.additionalRoles = {
                    InGAAssessmentCreator: false,
                    InGAAssessmentScoreEntry: false,
                    UMPUser: false,
                    CohortBuilder: false,
                    CohortPublisher: false
                };
                $scope.districtArray = [
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.isdArray = [
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.schoolArray = [
                    { id: 1, name: 'first', districtId: 1 },
                    { id: 2, name: 'second', districtId: 1 },
                    { id: 3, name: 'third', districtId: 1 },
                    { id: 4, name: 'fourth', districtId: 1 },
                    { id: 5, name: 'fifth', districtId: 1 },
                ];
                // $scope.user.districts = [];
            };
            $scope.$watch(function () { return navService.shouldPostUser; }, function (newValue, oldValue) {
                if (newValue) {
                    console.log("should post user");
                    $scope.postUser();
                    navService.shouldPostUser = false;
                }
            });
            $scope.toggleShowPassword = function () {
                $scope.hidePasswordFields = !$scope.hidePasswordFields;
            };
            $scope.selectUserType = function () {
                console.log($scope.user.userType);
                var userType = $scope.user.userType;
                $scope.resetSelectedOptions();
                if (userType == "4" || userType == "7") {
                    $scope.isdUser = true;
                    $scope.districts = [];
                    $scope.schools = [];
                }
                if (userType == "3" || userType == "6") {
                    $scope.districtUser = true;
                    $scope.schools = [];
                }
                if (userType == "2" || userType == "5") {
                    $scope.schoolUser = true;
                }
                if (userType == "1") {
                    $scope.classroomUser = true;
                }
            };
            $scope.resetSelectedOptions = function () {
                $scope.isdUser = false;
                $scope.districtUser = false;
                $scope.schoolUser = false;
                $scope.classroomUser = false;
            };
            $scope.selectISD = function () {
                $scope.user.districts = [];
                $scope.user.schools = [];
                console.log("should update districts");
            };
            $scope.selectDistrict = function (item, model) {
                // $scope.user.schools = [];
                $scope.schoolArray = [
                    { id: 1, name: 'first', districtId: 1 },
                    { id: 2, name: 'second', districtId: 1 },
                    { id: 3, name: 'third', districtId: 1 },
                    { id: 4, name: 'fourth', districtId: 1 },
                    { id: 5, name: 'fifth', districtId: 1 },
                ];
            };
            $scope.removeDistrict = function (item, model) {
                // var schoolsToRemove = [];
                for (var i = 0; i < $scope.user.schools.length; i++) {
                    if ($scope.user.schools[i].districtId == item.id) {
                        // schoolsToRemove.push($scope.user.schools[i].id);
                        $scope.user.schools.splice(i, 1);
                    }
                }
            };
            $scope.selectSchool = function (item, model) {
                console.log(item);
                console.log($scope.user.schools);
                for (var i = 0; i < $scope.user.schools.length; i++) {
                    if ($scope.user.schools[i].name == item.name) {
                        if (!$scope.user.schools[i].schoolTeachers || $scope.user.schools[i].schoolTeachers.length == 0) {
                            //search for teachers at that school
                            $scope.user.schools[i].schoolTeachers = [
                                { id: 1, name: 'first', schoolId: 1 },
                                { id: 2, name: 'second', schoolId: 1 },
                                { id: 3, name: 'third', schoolId: 1 },
                                { id: 4, name: 'fourth', schoolId: 1 },
                                { id: 5, name: 'fifth', schoolId: 1 }
                            ];
                        }
                    }
                }
            };
            $scope.checkValidity = function () {
                var valid = true;
                var user = $scope.user;
                $scope.errorMessage = "";
                if (user == undefined) {
                    $scope.errorMessage = "Please fill out the form";
                    return false;
                }
                if (!user.email) {
                    $scope.errorMessage = "Invalid Email Format";
                    return false;
                }
                if (!user.username || user.username == "" || !user.firstName || user.firstName == "" || !user.lastName || user.lastName == "") {
                    $scope.errorMessage = "One of the name fields are empty";
                    return false;
                }
                if ($scope.inNewUser && user.password == "") {
                    $scope.errorMessage = "Password is empty";
                    return false;
                }
                if (user.userType == undefined) {
                    $scope.errorMessage = "Select A User Type";
                    return false;
                }
                if (user.userType == "4" || user.userType == "7") {
                    if (!user.isd) {
                        $scope.errorMessage = "You have to belong to an ISD";
                        return false;
                    }
                }
                if (user.userType == "3" || user.userType == "6") {
                    if (!user.districts || user.districts.length == 0) {
                        $scope.errorMessage = "You have to belong to an District";
                        return false;
                    }
                }
                if (user.userType == "2" || user.userType == "5") {
                    if (!user.schools || user.schools.length == 0) {
                        $scope.errorMessage = "You have to belong to an School";
                        return false;
                    }
                }
                return true;
                /////////// classroom user login - ask about
                // if(user.userType == "1"){
                //
                //   if(!user.schools || user.districts.length == 0){
                //     return false;
                //   }
                // }
            };
            $scope.postUser = function () {
                console.log("here");
                if ($scope.checkValidity()) {
                }
                else {
                }
            };
        }
        UserController.$inject = ['$scope', '$routeParams', 'navigationService', 'usersService'];
        return UserController;
    }(BaseController.Controller));
    UMPApp.UserController = UserController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UserController.js.map
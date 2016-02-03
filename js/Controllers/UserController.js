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
                    usersService.searchUser($routeParams.userKey).then(function (d) {
                        console.log(d);
                        $scope.user = d;
                        $scope.setupUser();
                    });
                    usersService.getISDList().then(function (d) {
                        console.log(d);
                        $scope.isdArray = d;
                        if ($scope.user != null) {
                            $scope.ISD = $scope.user.ISD;
                        }
                    });
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
                $scope.districtArray = [];
                $scope.isdArray = [];
                $scope.schoolArray = [];
                // $scope.user.districts = [];
            };
            $scope.setupUser = function () {
                $scope.user.AdditionalRoles = {
                    InGAAssessmentCreator: false,
                    InGAAssessmentScoreEntry: false,
                    UMPUser: false,
                    CohortBuilder: false,
                    CohortPublisher: false
                };
                if ($scope.user.Roles.indexOf("UMP User Role") > -1) {
                    $scope.user.AdditionalRoles.UMPUser = true;
                }
                if ($scope.user.Roles.indexOf("InGA Assessment Creator Role") > -1) {
                    $scope.user.AdditionalRoles.InGAAssessmentCreator = true;
                }
                if ($scope.user.Roles.indexOf("InGA Assessment Score Entry Role") > -1) {
                    $scope.user.AdditionalRoles.InGAAssessmentScoreEntry = true;
                }
                if ($scope.user.Roles.indexOf("Cohort Builder Role") > -1) {
                    $scope.user.AdditionalRoles.CohortBuilder = true;
                }
                if ($scope.user.Roles.indexOf("Cohort Publisher Role") > -1) {
                    $scope.user.AdditionalRoles.CohortPublisher = true;
                }
                $scope.userType = String($scope.user.UserType.IgorUserRoleKey);
                $scope.selectUserType();
                // if($scope.isdArray.length == 0){
                //   $scope.isdArray.push($scope.user.ISD);
                // }
                $scope.ISD = $scope.user.ISD;
                if ($scope.districtArray.length == 0) {
                    usersService.getDistrictList(String($scope.ISD.ISDKey)).then(function (d) {
                        console.log(d);
                        $scope.districtArray = d;
                        // remove already selected
                        // for(var i = 0; i< $scope.user.Districts.length; i++){
                        //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
                        //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
                        //   }
                        // }
                    });
                    for (var i = 0; i < $scope.user.Districts.length; i++) {
                        $scope.districtArray.push($scope.user.Districts[i]);
                    }
                }
                if ($scope.schoolArray.length == 0) {
                    for (var i = 0; i < $scope.user.Schools.length; i++) {
                        $scope.schoolArray.push($scope.user.Schools[i]);
                    }
                }
                if ($scope.user.Teachers.length > 0) {
                    for (var i = 0; i < $scope.user.Teachers.length; i++) {
                        for (var j = 0; j < $scope.user.Schools.length; j++) {
                            if ($scope.user.Teachers[i].SchoolKey == $scope.user.Schools[j].SchoolKey) {
                                if ($scope.user.Schools[j].schoolTeachers == undefined) {
                                    $scope.user.Schools[j].schoolTeachers = [];
                                }
                                if ($scope.user.Schools[j].selectedTeachers == undefined) {
                                    $scope.user.Schools[j].selectedTeachers = [];
                                }
                                $scope.user.Schools[j].schoolTeachers.push($scope.user.Teachers[i]);
                                $scope.user.Schools[j].selectedTeachers.push($scope.user.Teachers[i]);
                            }
                        }
                    }
                }
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
                // console.log($scope.user.userType);
                var userType = $scope.userType;
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
                $scope.user.Districts = [];
                $scope.user.Schools = [];
                console.log("should update districts");
                usersService.getDistrictList(String($scope.ISD.ISDKey)).then(function (d) {
                    console.log(d);
                    $scope.districtArray = d;
                    // remove already selected
                    // for(var i = 0; i< $scope.user.Districts.length; i++){
                    //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
                    //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
                    //   }
                    // }
                });
            };
            $scope.selectDistrict = function (item, model) {
                // $scope.user.schools = [];
                $scope.schoolArray = [];
                /**********
                *
                *     Get all schools with selected districts, filter out already selected
                *
                ***********/
            };
            $scope.removeDistrict = function (item, model) {
                // var schoolsToRemove = [];
                for (var i = 0; i < $scope.user.Schools.length; i++) {
                    if ($scope.user.Schools[i].DistrictKey == item.DistrictKey) {
                        // schoolsToRemove.push($scope.user.schools[i].id);
                        $scope.user.Schools.splice(i, 1);
                    }
                }
            };
            $scope.selectSchool = function (item, model) {
                // console.log(item);
                // console.log($scope.user.schools);
                for (var i = 0; i < $scope.user.Schools.length; i++) {
                    if ($scope.user.Schools[i].SchoolName == item.name) {
                        if (!$scope.user.Schools[i].schoolTeachers || $scope.user.Schools[i].schoolTeachers.length == 0) {
                            //search for teachers at that school
                            $scope.user.Schools[i].schoolTeachers = [];
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
                if (!user.Email) {
                    $scope.errorMessage = "Invalid Email Format";
                    return false;
                }
                if (!user.Username || user.Username == "" || !user.FirstName || user.FirstName == "" || !user.LastName || user.LastName == "") {
                    $scope.errorMessage = "One of the name fields are empty";
                    return false;
                }
                if ($scope.inNewUser && user.Password == "") {
                    $scope.errorMessage = "Password is empty";
                    return false;
                }
                if (user.UserType == undefined) {
                    $scope.errorMessage = "Select A User Type";
                    return false;
                }
                // if(user.UserType == "4" || user.UserType == "7"){
                //   if(!user.isd){
                //     $scope.errorMessage = "You have to belong to an ISD";
                //     return false;
                //   }
                // }
                // if(user.UserType == "3" || user.UserType == "6"){
                //   if(!user.districts || user.districts.length == 0){
                //     $scope.errorMessage = "You have to belong to an District";
                //     return false;
                //   }
                // }
                // if(user.UserType == "2" || user.UserType == "5"){
                //   if(!user.schools || user.schools.length == 0){
                //     $scope.errorMessage = "You have to belong to an School";
                //     return false;
                //   }
                // }
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
            $scope.selectSchoolTeacher = function (item, school) {
                console.log(item);
                console.log(school);
                if (!school.selectedTeachers) {
                    school.selectedTeachers = [item];
                }
                else {
                    school.selectedTeachers.push(item);
                }
                // for(var i = 0; i< )
            };
        }
        UserController.$inject = ['$scope', '$routeParams', 'navigationService', 'usersService'];
        return UserController;
    }(BaseController.Controller));
    UMPApp.UserController = UserController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UserController.js.map
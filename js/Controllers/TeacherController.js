///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMPApp;
(function (UMPApp) {
    var TeacherController = (function (_super) {
        __extends(TeacherController, _super);
        function TeacherController($scope, navService, teacherService, usersService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Teacher Lookup" });
                navService.updateUserFilter("", { DistrictKey: 0, DistrictName: "" }, { IgorUserRoleKey: 0, Name: "" });
                $scope.districtArray = [];
                $scope.districtArray.push({ DistrictKey: 0, DistrictName: 'Select District' });
                $scope.selectedDistrict = $scope.districtArray[0];
                usersService.getAvailableDistricts().then(function (d) {
                    $scope.districtArray = d;
                    $scope.districtArray.unshift({ DistrictKey: 0, DistrictName: 'Select District' });
                });
                $scope.schoolArray = [];
                $scope.schoolArray.push({ DistrictKey: 0, SchoolKey: 0, SchoolName: '' });
                $scope.selectedSchool = $scope.schoolArray[0];
                this.searchInput = "";
                $scope.teachers = [];
                console.log("init teachers");
            };
            $scope.$watch(function () { return $scope.searchInput; }, function (newValue, oldValue) {
                $scope.searchTeachers();
            });
            $scope.$watch(function () { return teacherService.shouldClearFilters; }, function (newValue, oldValue) {
                if (newValue) {
                    $scope.searchInput = "";
                    teacherService.clearedFilters();
                    $scope.selectedDistrict = $scope.districtArray[0];
                    $scope.selectedSchool = $scope.schoolArray[0];
                    $scope.searchTeachers();
                }
            });
            $scope.searchTeachers = function () {
                teacherService.searchTeachers($scope.searchInput, $scope.selectedDistrict.DistrictKey, $scope.selectedSchool.SchoolKey).then(function (d) {
                    console.log(d);
                    $scope.teachers = d;
                });
            };
            $scope.selectDistrict = function (item, model) {
                $scope.searchTeachers();
                usersService.getSchoolList(item.DistrictKey).then(function (d) {
                    $scope.schoolArray = d;
                    $scope.schoolArray.unshift({ DistrictKey: 0, SchoolName: 'Select School', SchoolKey: 0 });
                    $scope.selectedSchool = $scope.schoolArray[0];
                });
            };
            $scope.selectSchool = function (item, model) {
                $scope.searchTeachers();
            };
        }
        TeacherController.$inject = ['$scope', 'navigationService', 'teacherService', 'usersService'];
        return TeacherController;
    }(BaseController.Controller));
    UMPApp.TeacherController = TeacherController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=TeacherController.js.map
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
        function TeacherController($scope, navService, teacherService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Teacher Lookup" });
                navService.updateUserFilter("", { id: 0, name: "" }, { IgorUserRoleKey: 0, Name: "" });
                $scope.districtArray = [
                    { id: 0, name: 'Select District' },
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.selectedDistrict = $scope.districtArray[0];
                $scope.schoolArray = [];
                $scope.selectedSchool = $scope.schoolArray[0];
                this.searchInput = "";
                $scope.teachers = [];
                $scope.teachers = [{
                        district: "Cedar Springs Public",
                        school: "Cedar Trails Elem School",
                        firstName: "E",
                        lastName: "Sullivan",
                        teacherId: "999",
                        scheduleCount: "0"
                    },
                    {
                        district: "Cedar Springs Public",
                        school: "Cedar Trails Elem School",
                        firstName: "S",
                        lastName: "Sendler",
                        teacherId: "995",
                        scheduleCount: "0"
                    },
                    {
                        district: "Cedar Springs Public",
                        school: "Cedar Trails Elem School",
                        firstName: "A",
                        lastName: "Secor",
                        teacherId: "994",
                        scheduleCount: "0"
                    }];
                console.log("init teachers");
            };
            $scope.$watch(function () { return $scope.searchInput; }, function (newValue, oldValue) {
                $scope.searchTeachers();
            });
            $scope.$watch(function () { return teacherService.shouldClearFilters; }, function (newValue, oldValue) {
                if (newValue) {
                    $scope.searchInput = "";
                    // $scope.selectedDistrict = {id: 0, name: "Select District"};
                    // $scope.selectedSchool = {id: 0, name: "Select School"};
                    teacherService.clearedFilters();
                }
            });
            $scope.searchTeachers = function () {
                // teacherService.searchTeachers($scope.searchInput, $scope.selectedDistrict.id, $scope.selectedSchool.id);
            };
            $scope.selectDistrict = function (item, model) {
                // if($scope.selectedDistrict != item){
                $scope.searchTeachers();
                // }
            };
            $scope.selectSchool = function (item, model) {
                // if($scope.selectedUserType != item){
                $scope.searchTeachers();
                // }
            };
        }
        TeacherController.$inject = ['$scope', 'navigationService', 'teacherService'];
        return TeacherController;
    }(BaseController.Controller));
    UMPApp.TeacherController = TeacherController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=TeacherController.js.map
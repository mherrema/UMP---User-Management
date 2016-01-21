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
        function TeacherController($scope, navService) {
            _super.call(this, $scope);
            var controller = this;
            // navService.goToMainNav();
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Teacher Lookup" });
                $scope.districtArray = [
                    { id: 0, name: 'Select District' },
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.selectedDistrict = $scope.districtArray[0];
                $scope.schoolArray = [
                    { id: 0, name: 'Select School' },
                    { id: 1, name: 'first' },
                    { id: 2, name: 'second' },
                    { id: 3, name: 'third' },
                    { id: 4, name: 'fourth' },
                    { id: 5, name: 'fifth' },
                ];
                $scope.selectedSchool = $scope.schoolArray[0];
            };
        }
        TeacherController.$inject = ['$scope', 'navigationService'];
        return TeacherController;
    })(BaseController.Controller);
    UMPApp.TeacherController = TeacherController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=TeacherController.js.map
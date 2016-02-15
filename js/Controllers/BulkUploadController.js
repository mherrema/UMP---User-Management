///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UMPApp;
(function (UMPApp) {
    var BulkUploadController = (function (_super) {
        __extends(BulkUploadController, _super);
        function BulkUploadController($scope, $http, $filter, navService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Bulk Upload" });
                // navService.updateUserFilter("", {id: 0, name: ""}, {id: 0, name: ""});
                this.apiRoot = "http://172.21.255.136";
                // $scope.apiRoot = "http://win-iq115hn5k0f";
            };
            $scope.setFiles = function (element) {
                $scope.$apply(function (scope) {
                    console.log('files:', element.files);
                    // Turn the FileList object into an Array
                    $scope.file = element.files;
                    // for (var i = 0; i < element.files.length; i++) {
                    //   $scope.file.push(element.files[i])
                    // }
                    // scope.progressVisible = false
                });
            };
            $scope.startUpload = function () {
                var r = new FileReader();
                r.onload = function (e) {
                    var csvContents = r.result;
                    $scope.$apply(function () {
                        var lines, length;
                        $scope.userArray = [];
                        lines = csvContents.split('\n');
                        for (var i = 1; i < lines.length; i++) {
                            var l = lines[i];
                            // data = l.split(',(?=([^\"]*\"[^\"]*\")*[^\"]*$)');
                            var data = [];
                            var start = 0;
                            var inQuotes = false;
                            for (var current = 0; current < l.length; current++) {
                                if (l.charAt(current) == '\"')
                                    inQuotes = !inQuotes; // toggle state
                                var atLastChar = (current == l.length - 1);
                                if (atLastChar)
                                    data.push(l.substring(start));
                                else if (l.charAt(current) == ',' && !inQuotes) {
                                    data.push(l.substring(start, current));
                                    start = current + 1;
                                }
                            }
                            if (data.length == 13) {
                                var isdCode = data[0];
                                var districtCode = data[1];
                                var schoolCodesString = data[2].replace(/[\u201C\u201D\"\']/g, "");
                                var teacherNumbersString = data[3].replace(/[\u201C\u201D\"\']/g, "");
                                var userType = data[4];
                                var email = data[5];
                                var firstName = data[6];
                                var lastName = data[7];
                                var InGAScoreEntry = data[8];
                                var InGAAssessmentCreator = data[9];
                                var CohortBuilder = data[10];
                                var CohortPublisher = data[11];
                                var UserAgreement = data[12];
                                // var districtKeys = districtKeysString.split(',');
                                var schoolCodes = schoolCodesString.split(',');
                                var schools = [];
                                for (var j = 0; j < schoolCodes.length; j++) {
                                    if (schoolCodes[j] != "") {
                                        schools.push({ SchoolCode: schoolCodes[j] });
                                    }
                                }
                                var teacherNumbers = teacherNumbersString.split(',');
                                var teachers = [];
                                for (var k = 0; k < teacherNumbers.length; k++) {
                                    if (teacherNumbers[k] != "") {
                                        teachers.push({ TeacherNumber: teacherNumbers[k] });
                                    }
                                }
                                $scope.userArray.push({
                                    ISDCode: isdCode,
                                    ISDName: "",
                                    DistrictCode: districtCode,
                                    DistrictName: "",
                                    Schools: schools,
                                    SchoolTeachers: teachers,
                                    UserType: userType,
                                    Email: email,
                                    FirstName: firstName,
                                    LastName: lastName,
                                    InGAScoreEntry: InGAScoreEntry,
                                    InGAAssessmentCreator: InGAAssessmentCreator,
                                    CohortBuilder: CohortBuilder,
                                    CohortPublisher: CohortPublisher,
                                    UserAgreement: UserAgreement,
                                    IsRowValid: true
                                });
                            }
                        }
                        ;
                        console.log($scope.userArray);
                        $http.post($scope.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/VerifyUsers/', $scope.userArray)
                            .then(function (response) {
                            $scope.userArray = response.data;
                            $scope.errors = false;
                            for (var l = 0; l < $scope.userArray.length; l++) {
                                if (!$scope.userArray[l].IsRowValid) {
                                    $scope.errors = true;
                                }
                            }
                            // return response.data;
                        });
                    });
                };
                r.readAsText($scope.file[0]);
            };
            $scope.uploadUsers = function () {
                $http.post($scope.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Upload/', $scope.userArray)
                    .then(function (response) {
                    console.log(response);
                    // return response.data;
                    $scope.uploaded = true;
                    $scope.uploadedCount = 5;
                })
                    .catch(function (response) {
                    console.error('Gists error', response.status, response.data);
                })
                    .finally(function () {
                    console.log("finally finished gists");
                });
            };
        }
        BulkUploadController.$inject = ['$scope', '$http', '$filter', 'navigationService'];
        return BulkUploadController;
    }(BaseController.Controller));
    UMPApp.BulkUploadController = BulkUploadController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=BulkUploadController.js.map
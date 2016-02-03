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
        function BulkUploadController($scope, navService) {
            _super.call(this, $scope);
            var controller = this;
            $scope.init = function () {
                navService.setCurrentRoute({ name: "Bulk Upload" });
                // navService.updateUserFilter("", {id: 0, name: ""}, {id: 0, name: ""});
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
            $scope.uploadFile = function () {
                // var fd = new FormData()
                // for (var i in $scope.files) {
                //   fd.append("uploadedFile", $scope.files[i])
                // }
                // var xhr = new XMLHttpRequest()
                // xhr.upload.addEventListener("progress", uploadProgress, false)
                // xhr.addEventListener("load", uploadComplete, false)
                // xhr.addEventListener("error", uploadFailed, false)
                // xhr.addEventListener("abort", uploadCanceled, false)
                // xhr.open("POST", "/fileupload")
                // scope.progressVisible = true
                // xhr.send(fd)
            };
        }
        BulkUploadController.$inject = ['$scope', 'navigationService'];
        return BulkUploadController;
    }(BaseController.Controller));
    UMPApp.BulkUploadController = BulkUploadController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=BulkUploadController.js.map
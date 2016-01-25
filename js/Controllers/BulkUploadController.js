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
                navService.updateUserFilter("", { id: 0, name: "" }, { id: 0, name: "" });
            };
        }
        BulkUploadController.$inject = ['$scope', 'navigationService'];
        return BulkUploadController;
    }(BaseController.Controller));
    UMPApp.BulkUploadController = BulkUploadController;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=BulkUploadController.js.map
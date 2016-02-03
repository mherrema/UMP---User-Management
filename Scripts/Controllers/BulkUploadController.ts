///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IBulkUploadScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    actionsShown: Array< boolean >;
    init: Function;
    setFiles: Function;
    file: Object;
    uploadFile: Function;
  }

  export class BulkUploadController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', 'navigationService'];

    actionsShown: Array<boolean>;
    constructor( $scope: IBulkUploadScope, navService: NavigationService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        navService.setCurrentRoute({name: "Bulk Upload"});
        // navService.updateUserFilter("", {id: 0, name: ""}, {id: 0, name: ""});
      }

      $scope.setFiles = function(element) {
        $scope.$apply(function(scope) {
          console.log('files:', element.files);
          // Turn the FileList object into an Array
          $scope.file = element.files;
          // for (var i = 0; i < element.files.length; i++) {
          //   $scope.file.push(element.files[i])
          // }
          // scope.progressVisible = false
        });
      };

      $scope.uploadFile = function() {
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
      }
    }

    // setActionsShown(input: Array< boolean >):void{
    //   this.actionsShown = input;
    // }
    //
    // closeActions():void
    // {
    //   for(var index in this.actionsShown){
    //     this.actionsShown[index] = false;
    //   }
    // }
    //
    // toggleActions(index:number)
    // {
    //   //close if selecting one already open
    //   if(this.actionsShown[index]){
    //     this.actionsShown[index] = false;
    //   }
    //   //close all and open
    //   else
    //   {
    //     this.closeActions();
    //     this.actionsShown[index] = true;
    //   }
    // }

  }
}

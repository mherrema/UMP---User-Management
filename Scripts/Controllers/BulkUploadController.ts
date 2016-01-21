///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IBulkUploadScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    actionsShown: Array< boolean >;
    init: Function;
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
      // navService.goToMainNav();

      $scope.init = function(){
        navService.setCurrentRoute({name: "Bulk Upload"});
        // $scope.activityItems = activityService.getActivityItems();
        // navService.setCurrentRoute({ route: {name: 'Activity', url: "#/activity"}});
        // $scope.actionsShown = new Array < boolean >();
        // $scope.activityItems.forEach(s => {
        //   $scope.actionsShown.push(false);
        // });
        // controller.setActionsShown($scope.actionsShown);
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

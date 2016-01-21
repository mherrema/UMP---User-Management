///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface INavigationScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    // actionsShown: Array< boolean >;
    init: Function;
    currentRoute: INavItem;
    isActive: Function;
  }

  export class NavigationController extends BaseController.Controller
  {
    scope: INavigationScope;
    static $inject = ['$scope', 'navigationService'];

    constructor( $scope: INavigationScope, navService: NavigationService)
    {
      super( $scope );

      var controller = this;
      // navService.goToMainNav();

      $scope.init = function(){
        // $scope.activityItems = activityService.getActivityItems();
        // navService.setCurrentRoute({ route: {name: 'Activity', url: "#/activity"}});
        // $scope.actionsShown = new Array < boolean >();
        // $scope.activityItems.forEach(s => {
        //   $scope.actionsShown.push(false);
        // });
        // controller.setActionsShown($scope.actionsShown);
      }

      $scope.$watch(() => navService.currentRoute,
      (newValue: INavItem, oldValue: INavItem) => {
        $scope.currentRoute = newValue;
      });

      $scope.isActive = function(navName){
        if($scope.currentRoute.name == "User Management" && navName == "Users"){
          return true;
        }
        if($scope.currentRoute.name == "Teacher Lookup" && navName == "Teachers"){
          return true;
        }
        if($scope.currentRoute.name == "Bulk Upload" && navName == "Bulk Upload"){
          return true;
        }
        return false;
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

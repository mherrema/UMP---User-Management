///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IUserScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    actionsShown: Array< boolean >;
    init: Function;
    districtArray: Array<Object>;
    userTypeArray: Array<Object>;
    selectedDistrict: Object;
    selectedUserType: Object;
  }

  export class UserController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', 'navigationService'];

    actionsShown: Array<boolean>;
    constructor( $scope: IUserScope, navService: NavigationService)
    {
      super( $scope );

      var controller = this;
      // navService.goToMainNav();

      $scope.init = function(){
        navService.setCurrentRoute({name: "User Management"});
        $scope.districtArray = [
          {id: 0, name: 'Select District'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];

        $scope.selectedDistrict= $scope.districtArray[0];

        $scope.userTypeArray = [
          {id: 0, name: 'Select User Type'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];

        $scope.selectedUserType = $scope.userTypeArray[0];
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

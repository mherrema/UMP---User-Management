///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface ITeacherScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    actionsShown: Array< boolean >;
    init: Function;
    districtArray: Array<Object>;
    schoolArray: Array<Object>;
    selectedDistrict: Object;
    selectedSchool: Object;
  }

  export class TeacherController extends BaseController.Controller
  {
    scope: ITeacherScope;
    static $inject = ['$scope', 'navigationService'];

    actionsShown: Array<boolean>;
    constructor( $scope: ITeacherScope, navService: NavigationService)
    {
      super( $scope );

      var controller = this;
      // navService.goToMainNav();

      $scope.init = function(){
        navService.setCurrentRoute({name: "Teacher Lookup"});
        $scope.districtArray = [
          {id: 0, name: 'Select District'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];

        $scope.selectedDistrict= $scope.districtArray[0];

        $scope.schoolArray = [
          {id: 0, name: 'Select School'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];

        $scope.selectedSchool = $scope.schoolArray[0];
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

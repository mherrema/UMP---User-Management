///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface INavigationScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    // actionsShown: Array< boolean >;
    init: Function;
    clearFilters: Function;
    currentRoute: INavItem;
    isActive: Function;
    filtersActive: boolean;
    shouldShowButton: boolean;
    inUserEdit: boolean;
  }

  export class NavigationController extends BaseController.Controller
  {
    scope: INavigationScope;
    static $inject = ['$scope', 'navigationService', 'usersService', 'teacherService'];

    constructor( $scope: INavigationScope, navService: NavigationService, usersService: UsersService, teacherService: TeacherService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){

      }

      $scope.$watch(() => navService.currentRoute,
      (newValue: INavItem, oldValue: INavItem) => {
        $scope.currentRoute = newValue;
      });

      $scope.$watch(() => navService.shouldShowButton,
      (newValue: boolean, oldValue: boolean) => {
        $scope.shouldShowButton = newValue;
      });

      $scope.$watch(() => navService.inUserEdit,
      (newValue: boolean, oldValue: boolean) => {
        $scope.inUserEdit = newValue;
      });

      $scope.$watch(() => usersService.filtersActive,
      (newValue: boolean, oldValue: boolean) => {
        $scope.filtersActive = newValue;
      });

      $scope.$watch(() => teacherService.filtersActive,
      (newValue: boolean, oldValue: boolean) => {
        $scope.filtersActive = newValue;
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

      $scope.clearFilters = function(){
        usersService.clearFilters();
        teacherService.clearFilters();
      }
    }

  }
}

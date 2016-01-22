///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IUserScope extends BaseController.IScope
  {
    init: Function;
    toggleShowPassword: Function;
    hidePasswordFields: boolean;
  }

  export class UserController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', 'navigationService', 'usersService'];

    constructor( $scope: IUserScope, navService: NavigationService, usersService: UsersService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        navService.setCurrentRoute({name: "Edit User"});
        $scope.hidePasswordFields = true;
      }

      $scope.toggleShowPassword = function(){
        $scope.hidePasswordFields = !$scope.hidePasswordFields;
      }
    }

  }
}

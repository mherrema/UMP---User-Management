///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IUserScope extends BaseController.IScope
  {
    init: Function;
    searchUsers: Function;
    selectDistrict: Function;
    selectUserType: Function;
    districtArray: Array<District>;
    userTypeArray: Array<UserType>;
    selectedDistrict: District;
    selectedUserType: UserType;
    searchInput: string;
    users: Array<Object>;
  }

  export class UsersController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', 'navigationService', 'usersService'];

    constructor( $scope: IUserScope, navService: NavigationService, usersService: UsersService)
    {
      super( $scope );

      var controller = this;

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
        this.searchInput = "";
        $scope.users = [];
        $scope.users = [{
          id: 1,
          name: "Byron Center School",
          username: "bcschool@fake.com",
          email: "bcschool@fake.com",
          lastLogin: "1/15/2016 7:58 PM",
          lockedOut: "No",
          roles: "Byron Center School Users"
        },
        {
          id: 2,
          name: "Byron Center School",
          username: "bcschool@fake.com",
          email: "bcschool@fake.com",
          lastLogin: "1/15/2016 7:58 PM",
          lockedOut: "No",
          roles: "Byron Center School Users"
        },
        {
          id: 3,
          name: "Byron Center School",
          username: "bcschool@fake.com",
          email: "bcschool@fake.com",
          lastLogin: "1/15/2016 7:58 PM",
          lockedOut: "No",
          roles: "Byron Center School Users"
        },
        {
          id: 4,
          name: "Byron Center School",
          username: "bcschool@fake.com",
          email: "bcschool@fake.com",
          lastLogin: "1/15/2016 7:58 PM",
          lockedOut: "No",
          roles: "Byron Center School Users"
        }];
      }

      $scope.$watch(() => usersService.shouldClearFilters,
      (newValue: boolean, oldValue: boolean) => {
        if(newValue){
          $scope.searchInput = "";
          $scope.selectedDistrict = {id: 0, name: "Select District"};
          $scope.selectedUserType = {id: 0, name: "Select User Type"};
          usersService.clearedFilters();
        }
      });

      $scope.$watch(() => $scope.searchInput,
      (newValue: string, oldValue: string) => {
        $scope.searchUsers();
      });

      $scope.searchUsers = function(){
        console.log("searching!");
        usersService.searchUsers($scope.searchInput, $scope.selectedDistrict.id, $scope.selectedUserType.id);
      }

      $scope.selectDistrict = function(item, model){
        // if($scope.selectedDistrict != item){
          $scope.searchUsers();
        // }
      }

      $scope.selectUserType = function(item, model){
        // if($scope.selectedUserType != item){
          $scope.searchUsers();
        // }
      }
    }

  }
}

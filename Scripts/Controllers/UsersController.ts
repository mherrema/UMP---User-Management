///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface IUsersScope extends BaseController.IScope
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
    users: Array<IUser>;
  }

  export class UsersController extends BaseController.Controller
  {
    scope: IUsersScope;
    static $inject = ['$scope', '$http', 'navigationService', 'usersService'];

    constructor( $scope: IUsersScope, $http: ng.IHttpService, navService: NavigationService, usersService: UsersService)
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
        // $scope.userTypeArray = [
        //   {IgorUserRoleKey: 0, Name: 'Select User Type'},
        //   {id: 1, name: 'first'},
        //   {id: 2, name: 'second'},
        //   {id: 3, name: 'third'},
        //   {id: 4, name: 'fourth'},
        //   {id: 5, name: 'fifth'},
        // ];
        $scope.selectedUserType = {IgorUserRoleKey: 0, Name: 'Select User Type'};
        this.searchInput = "";
        $scope.users = [];




        if(navService.currentUserFilter.searchInput != ""){
          $scope.searchInput = navService.currentUserFilter.searchInput;
        }
        if(navService.currentUserFilter.district.id != 0){
          $scope.selectedDistrict = navService.currentUserFilter.district;
        }
        if(navService.currentUserFilter.userType.IgorUserRoleKey != 0){
          $scope.selectedUserType = navService.currentUserFilter.userType;
        }

        // $http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/')
        // .success(function(response: Array<IUser>){
        //   $scope.users = response;
        // });
      }

      $scope.$watch(() => usersService.shouldClearFilters,
      (newValue: boolean, oldValue: boolean) => {
        if(newValue){
          $scope.searchInput = "";
          $scope.selectedDistrict = {id: 0, name: "Select District"};
          $scope.selectedUserType = {IgorUserRoleKey: 0, Name: "Select User Type"};
          usersService.clearedFilters();
        }
      });

      $scope.$watch(() => $scope.searchInput,
      (newValue: string, oldValue: string) => {
        $scope.searchUsers();
      });

      $scope.$watch(() => usersService.users,
      (newValue: Array<IUser>, oldValue: Array<IUser>) => {
        $scope.users = newValue;
      });

      $scope.searchUsers = function(){
        console.log("searching!");
        usersService.searchUsers($scope.searchInput, $scope.selectedDistrict, $scope.selectedUserType).then(function(d: Array<IUser>){
          console.log(d);
          $scope.users = d;
          var users = $scope.users;
          for( var i = 0; i< users.length; i++){
            if(users[i].aspnet_Profile){
              var tmpArray = users[i].aspnet_Profile.PropertyNames.split("FullName");
              tmpArray = tmpArray[1].split(":");
              var index = parseInt(tmpArray[2]);
              var length = parseInt(tmpArray[3]);
              users[i].Name = users[i].aspnet_Profile.PropertyValuesString.substring(index, index+length);
              console.log(tmpArray);
            }
          }
        });

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

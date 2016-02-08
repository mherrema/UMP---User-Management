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
        $scope.districtArray = [];
        $scope.districtArray.push({DistrictKey: 0, DistrictName: 'Select District'});
        $scope.selectedDistrict= $scope.districtArray[0];
        usersService.getAvailableDistricts().then(function(d: Array<District>){
          $scope.districtArray = d;
          $scope.districtArray.unshift({DistrictKey: 0, DistrictName: 'Select District'});
        });
        $scope.userTypeArray = [
          {IgorUserRoleKey: 0, Name: 'Select User Type'},
          {IgorUserRoleKey: 1, Name: 'Classroom User'},
          {IgorUserRoleKey: 2, Name: 'School User'},
          {IgorUserRoleKey: 3, Name: 'District User'},
          {IgorUserRoleKey: 4, Name: 'ISD User'},
          {IgorUserRoleKey: 5, Name: 'Aggregate School User'},
          {IgorUserRoleKey: 6, Name: 'Aggregate District User'},
          {IgorUserRoleKey: 7, Name: 'Aggregate ISD User'}
        ];
        $scope.selectedUserType = {IgorUserRoleKey: 0, Name: 'Select User Type'};
        this.searchInput = "";
        $scope.users = [];




        if(navService.currentUserFilter.searchInput != ""){
          $scope.searchInput = navService.currentUserFilter.searchInput;
        }
        if(navService.currentUserFilter.district.DistrictKey != 0){
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
          $scope.selectedDistrict = {DistrictKey: 0, DistrictName: "Select District"};
          $scope.selectedUserType = {IgorUserRoleKey: 0, Name: "Select User Type"};
          usersService.clearedFilters();
          $scope.searchUsers();
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

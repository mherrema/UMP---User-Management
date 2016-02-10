module UMPApp
{
  // export interface IActivityItem
  // {
  //   title: string,
  //   details: string,
  //   createdOn: string;
  // }

  export interface INavItem
  {
    name: string
  }

  export interface UserFilter
  {
    searchInput : string;
    district: District;
    userType: UserType;
  }

  // export interface IRouteItem
  // {
  //   name: string,
  //   url: string,
  // }

  export class NavigationService
  {
    currentRoute: INavItem;
    shouldShowButton: boolean;
    inUserEdit: boolean;
    currentUserFilter: UserFilter;
    shouldPostUser: boolean;
    inUserNew: boolean;
    $http: ng.IHttpService;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    apiRoot: string;

    constructor($http: ng.IHttpService)
    {
      this.currentRoute = {name:""};
      this.shouldShowButton = false;
      this.shouldPostUser = false;
      this.inUserEdit = false;
      this.inUserNew = false;
      this.currentUserFilter = {searchInput: "", district:{DistrictKey: 0, DistrictName: ""},userType: {IgorUserRoleKey: 0, Name: ""}};
      this.$http = $http;
      this.apiRoot = "http://172.21.255.138";
      // this.apiRoot = "http://win-iq115hn5k0f";
    }

    setCurrentRoute(item: INavItem): void
    {
      console.log(item);
      this.currentRoute = item;
      if(item.name == "User Management"){
        this.shouldShowButton = true;
      }
      else{
        this.shouldShowButton = false;
      }

      if(item.name == "Edit User" || item.name == "Add User"){
        this.inUserEdit = true;
        if(item.name == "Add User"){
          this.inUserNew = true;
        }
        else{
          this.inUserNew = false;
        }
      }
      else{
        this.inUserEdit = false;
      }
      console.log("Setting route: " + this.currentRoute.name);
    }

    updateUserFilter(searchInput: string, district: District, userType: UserType){
      this.currentUserFilter = {searchInput, district, userType};
    }

    postUser(){
      this.shouldPostUser = true;
    }

    getMyUserType(): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/UserType/')
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return this.promise;
    }
  }
}

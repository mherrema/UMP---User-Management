module UMPApp
{
  export interface IUser
  {
    LastActivityDate: string,
    UserName: string,
    LoweredUserName: string,
    aspnet_Membership: Object,
    aspnet_Profile: aspnet_Profile,
    Name: string
  }

  export interface aspnet_Profile
  {
    PropertyNames: string,
    PropertyValuesString: string
  }

  export interface ISD
  {
    ISDKey: number,
    ISDName: string
  }

  export interface District
  {
    id: number,
    name: string
  }

  export interface School
  {
    SchoolKey: number,
    SchoolName: string,
    DistrictKey: number,
    schoolTeachers?: Array<SchoolTeacher>,
    selectedTeachers?: Array<SchoolTeacher>
  }

  export interface SchoolTeacher
  {
    SchoolTeacherKey: number,
    SchoolTeacherName: string,
    SchoolKey: number
  }
`  //
  // export interface UserType
  // {
  //   id: number,
  //   name: string
  // }`

  export class UsersService
  {
    users: Array<IUser>;
    shouldClearFilters: boolean;
    filtersActive: boolean;
    navService: NavigationService;
    $http: ng.IHttpService;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;

    static $inject = ['$http', 'navigationService'];

    constructor($http: ng.IHttpService, navService: NavigationService)
    {
      this.users = new Array<IUser>();
      this.filtersActive = false;
      this.navService = navService;
      this.$http = $http;
    }

    searchUsers(searchInput: string, district: District, userType: UserType): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var apiRoute = "/users";
      var filterString = "?";

      if(searchInput != ""){
        filterString+= "SearchInput=" + searchInput;
      }

      if(district.id != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "DistrictKey=" + district.id;
      }

      if(userType.IgorUserRoleKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "UserTypeKey=" + userType.IgorUserRoleKey;
      }

      if(filterString == "?"){
        filterString = "";
        this.filtersActive = false;
      }
      else{
        this.filtersActive = true;
      }

      this.navService.updateUserFilter(searchInput, district, userType);

      console.log(apiRoute + filterString);

      this.promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/')
      .then(function(response){
        this.users = response;
        return response.data;
      });

      return this.promise;
    }

    searchUser(userKey: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      console.log("in searchUser");
      console.log('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey);
      this.promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return this.promise;
    }

    clearFilters() :void
    {
      this.shouldClearFilters = true;
      this.navService.updateUserFilter("", {id: 0, name: ""}, {IgorUserRoleKey: 0, Name: ""});
    }

    clearedFilters() :void
    {
      this.filtersActive = false;
      this.shouldClearFilters = false;
    }

    getISDList() :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/ISD/')
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }

    getDistrictList(isdKey: string) :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Districts/' + isdKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }
  }
}

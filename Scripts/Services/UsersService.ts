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
    DistrictKey: number,
    DistrictName: string
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
    FirstName: string,
    LastName: string,
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
    $q: ng.IQService;
    notificationService: NotificationService;
    promise: ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>;
    apiRoot: string;
    userSearchCanceler : ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;

    static $inject = ['$http', '$q', 'navigationService', 'notificationService'];

    constructor($http: ng.IHttpService, $q: ng.IQService, navService: NavigationService, notificationService: NotificationService)
    {
      this.users = new Array<IUser>();
      this.filtersActive = false;
      this.navService = navService;
      this.$http = $http;
      this.$q = $q;
      this.notificationService = notificationService;
      // this.apiRoot = "http://172.21.255.136";
      this.apiRoot = "http://win-iq115hn5k0f";
      this.userSearchCanceler = $q.defer();
    }

    searchUsers(searchInput: string, district: District, userType: UserType): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      this.userSearchCanceler.resolve();
      this.userSearchCanceler = this.$q.defer();
      var apiRoute = "/users";
      var filterString = "?";

      if(searchInput != ""){
        filterString+= "SearchInput=" + searchInput;
      }

      if(district.DistrictKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "DistrictKey=" + district.DistrictKey;
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

      this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + filterString,
      {timeout : this.userSearchCanceler.promise})
      .then(function(response){
        this.users = response;
        return response.data;
      });

      return this.promise;
    }

    searchUser(userKey: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      console.log("in searchUser");
      // console.log('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey);
      this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return this.promise;
    }

    deleteUser(userKey: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("in deleteUser");
      this.promise = this.$http.delete(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return this.promise;
    }

    postUser(userToPost: User): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>{
      console.log("hi!");
      console.log(userToPost);
      if(userToPost.UserKey != undefined && userToPost.UserKey != 0){
      var promise = this.$http.put(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/', userToPost)
      .then(function(response){
        console.log(response);
        return response.data;
      });
    }
    else{
      var promise = this.$http.post(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/', userToPost)
      .then(function(response){
        console.log(response);
        return response.data;
      });
    }

      return promise;
    }

    clearFilters() :void
    {
      this.shouldClearFilters = true;
      this.navService.updateUserFilter("", {DistrictKey: 0, DistrictName: ""}, {IgorUserRoleKey: 0, Name: ""});
    }

    clearedFilters() :void
    {
      this.filtersActive = false;
      this.shouldClearFilters = false;
    }

    getISDList() :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/ISD/')
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }

    getDistrictList(isdKey: string) :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Districts/' + isdKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }

    getSchoolList(districtKeys: string) :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      console.log("getting schools");
      console.log(districtKeys);
      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Schools/' + districtKeys)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }

    getSchoolTeacherList(schoolKey: string) :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      console.log("getting school teachers");
      // console.log(districtKeys);
      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/SchoolTeachers/' + schoolKey)
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }

    getAvailableDistricts() :ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/AvailableDistricts/')
      .then(function(response){
        // this.users = response;
        return response.data;
      });

      return promise;
    }
  }
}

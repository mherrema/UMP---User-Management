module UMPApp
{
  export interface ITeacher
  {
    TeacherKey: number;
    SchoolTeacherKey: number;
    FirstName: string;
    LastName: string;
    Email: string;
    SchoolKey: number;
    SchoolName: string;
    DistrictKey: number;
    DistrictName: string;
    ScheduleCount: number;
  }

  export class TeacherService
  {
    shouldClearFilters: boolean;
    filtersActive: boolean;
    apiRoot: string;
    $http: ng.IHttpService;
    $q: ng.IQService;
    teacherSearchCanceler : ng.IDeferred<ng.IHttpPromiseCallbackArg<{}>>;

    static $inject = ['$http', '$q'];

    constructor($http: ng.IHttpService, $q: ng.IQService)
    {
      this.$http = $http;
      this.$q = $q;
      this.filtersActive = false;
      // this.apiRoot = "http://172.21.255.136";
      this.apiRoot = "http://win-iq115hn5k0f";
      this.teacherSearchCanceler = $q.defer();
    }

    searchTeachers(searchInput: string, districtKey: number, schoolKey: number): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>>
    {
      this.teacherSearchCanceler.resolve();
      this.teacherSearchCanceler = this.$q.defer();
      var apiRoute = "/users";
      var filterString = "?";

      if(searchInput != ""){
        filterString+= "SearchInput=" + searchInput;
      }

      if(districtKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "DistrictKey=" + districtKey;
      }

      if(schoolKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "SchoolKey=" + schoolKey;
      }

      if(filterString == "?"){
        filterString = "";
        this.filtersActive = false;
      }
      else{
        this.filtersActive = true;
      }

      console.log(apiRoute + filterString);

      var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Teachers/' + filterString,
      {timeout : this.teacherSearchCanceler.promise})
      .then(function(response){
        this.users = response;
        return response.data;
      });

      return promise;
    }

    clearFilters() :void
    {
      this.shouldClearFilters = true;
    }

    clearedFilters() :void
    {
      this.filtersActive = false;
      this.shouldClearFilters = false;
    }
  }
}

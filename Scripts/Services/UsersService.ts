module UMPApp
{
  export interface IUser
  {
    name: string,
    url: string,
  }

  export interface ISD
  {
    id: number,
    name: string
  }

  export interface District
  {
    id: number,
    name: string
  }

  export interface School
  {
    id: number,
    name: string,
    districtId: number,
    schoolTeachers?: Array<SchoolTeacher>,
    selectedTeachers?: Array<SchoolTeacher>
  }

  export interface SchoolTeacher
  {
    id: number,
    name: string,
    schoolId: number
  }

  export interface UserType
  {
    id: number,
    name: string
  }

  export class UsersService
  {
    users: Array<IUser>;
    shouldClearFilters: boolean;
    filtersActive: boolean;
    navService: NavigationService;

    static $inject = ['navigationService'];

    constructor(navService: NavigationService)
    {
      this.users = new Array<IUser>();
      this.filtersActive = false;
      this.navService = navService;
    }

    searchUsers(searchInput: string, district: District, userType: UserType): void
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

      if(userType.id != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "UserTypeKey=" + userType.id;
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

    }

    clearFilters() :void
    {
      this.shouldClearFilters = true;
      this.navService.updateUserFilter("", {id: 0, name: ""}, {id: 0, name: ""});
    }

    clearedFilters() :void
    {
      this.filtersActive = false;
      this.shouldClearFilters = false;
    }
  }
}

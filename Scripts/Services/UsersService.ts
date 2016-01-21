module UMPApp
{
  export interface IUser
  {
    name: string,
    url: string,
  }

  export interface District
  {
    id: number,
    name: string
  }

  export interface School
  {
    id: number,
    name: string
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
    constructor()
    {
      this.users = new Array<IUser>();
      this.filtersActive = false;
    }

    searchUsers(searchInput: string, districtKey: number, userTypeKey: number): void
    {
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

      if(userTypeKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "UserTypeKey=" + userTypeKey;
      }

      if(filterString == "?"){
        filterString = "";
        this.filtersActive = false;
      }
      else{
        this.filtersActive = true;
      }

      console.log(apiRoute + filterString);

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

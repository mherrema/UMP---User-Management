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

    constructor()
    {
      this.currentRoute = {name:""};
      this.shouldShowButton = false;
      this.shouldPostUser = false;
      this.inUserEdit = false;
      this.currentUserFilter = {searchInput: "", district:{id: 0, name: ""},userType: {id: 0, name: ""}};
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
  }
}

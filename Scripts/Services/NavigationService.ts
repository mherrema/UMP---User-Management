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

    constructor()
    {
      this.currentRoute = {name:""};
      this.shouldShowButton = false;
      this.inUserEdit = false;
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

      if(item.name == "Edit User" || item.name == "New User"){
        this.inUserEdit = true;
      }
      else{
        this.inUserEdit = false;
      }
      console.log("Setting route: " + this.currentRoute.name);
    }
  }
}

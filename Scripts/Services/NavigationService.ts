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
    constructor()
    {
      this.currentRoute = {name:""};
    }

    setCurrentRoute(item: INavItem): void
    {
      // console.log(item);
      this.currentRoute = item;
      // if(this.currentRoute.route.name != "Projects" && this.currentRoute.route.name != "Activity" && this.currentRoute.route.name != "Clients"){
      //   this.filtersCollapsed = true;
      //   // this.shouldBodyFill = true;
      // }
      // else{
      //   this.filtersCollapsed = false;
      //   // this.shouldBodyFill = false;
      // }
      // if(this.shouldBodyFillViews.indexOf(this.currentRoute.route.name) > -1){
      //   this.shouldBodyFill = true;
      // }
      // else{
      //   this.shouldBodyFill = false;
      // }
      console.log("Setting route: " + this.currentRoute.name);
    }
  }
}

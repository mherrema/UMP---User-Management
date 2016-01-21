var UMPApp;
(function (UMPApp) {
    // export interface IRouteItem
    // {
    //   name: string,
    //   url: string,
    // }
    var NavigationService = (function () {
        function NavigationService() {
            this.currentRoute = { name: "" };
        }
        NavigationService.prototype.setCurrentRoute = function (item) {
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
        };
        return NavigationService;
    })();
    UMPApp.NavigationService = NavigationService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationService.js.map
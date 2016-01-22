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
            this.shouldShowButton = false;
            this.inUserEdit = false;
        }
        NavigationService.prototype.setCurrentRoute = function (item) {
            console.log(item);
            this.currentRoute = item;
            if (item.name == "User Management") {
                this.shouldShowButton = true;
            }
            else {
                this.shouldShowButton = false;
            }
            if (item.name == "Edit User" || item.name == "New User") {
                this.inUserEdit = true;
            }
            else {
                this.inUserEdit = false;
            }
            console.log("Setting route: " + this.currentRoute.name);
        };
        return NavigationService;
    })();
    UMPApp.NavigationService = NavigationService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationService.js.map
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
            this.shouldPostUser = false;
            this.inUserEdit = false;
            this.currentUserFilter = { searchInput: "", district: { id: 0, name: "" }, userType: { id: 0, name: "" } };
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
            if (item.name == "Edit User" || item.name == "Add User") {
                this.inUserEdit = true;
            }
            else {
                this.inUserEdit = false;
            }
            console.log("Setting route: " + this.currentRoute.name);
        };
        NavigationService.prototype.updateUserFilter = function (searchInput, district, userType) {
            this.currentUserFilter = { searchInput: searchInput, district: district, userType: userType };
        };
        NavigationService.prototype.postUser = function () {
            this.shouldPostUser = true;
        };
        return NavigationService;
    }());
    UMPApp.NavigationService = NavigationService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationService.js.map
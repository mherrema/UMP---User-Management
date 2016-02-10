var UMPApp;
(function (UMPApp) {
    // export interface IRouteItem
    // {
    //   name: string,
    //   url: string,
    // }
    var NavigationService = (function () {
        function NavigationService($http) {
            this.currentRoute = { name: "" };
            this.shouldShowButton = false;
            this.shouldPostUser = false;
            this.inUserEdit = false;
            this.inUserNew = false;
            this.currentUserFilter = { searchInput: "", district: { DistrictKey: 0, DistrictName: "" }, userType: { IgorUserRoleKey: 0, Name: "" } };
            this.$http = $http;
            this.apiRoot = "http://172.21.255.138";
            // this.apiRoot = "http://win-iq115hn5k0f";
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
                if (item.name == "Add User") {
                    this.inUserNew = true;
                }
                else {
                    this.inUserNew = false;
                }
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
        NavigationService.prototype.getMyUserType = function () {
            this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/UserType/')
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return this.promise;
        };
        return NavigationService;
    }());
    UMPApp.NavigationService = NavigationService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NavigationService.js.map
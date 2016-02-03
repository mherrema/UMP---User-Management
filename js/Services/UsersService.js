var UMPApp;
(function (UMPApp) {
    "  //\n  // export interface UserType\n  // {\n  //   id: number,\n  //   name: string\n  // }";
    var UsersService = (function () {
        function UsersService($http, navService) {
            this.users = new Array();
            this.filtersActive = false;
            this.navService = navService;
            this.$http = $http;
        }
        UsersService.prototype.searchUsers = function (searchInput, district, userType) {
            var apiRoute = "/users";
            var filterString = "?";
            if (searchInput != "") {
                filterString += "SearchInput=" + searchInput;
            }
            if (district.id != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "DistrictKey=" + district.id;
            }
            if (userType.IgorUserRoleKey != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "UserTypeKey=" + userType.IgorUserRoleKey;
            }
            if (filterString == "?") {
                filterString = "";
                this.filtersActive = false;
            }
            else {
                this.filtersActive = true;
            }
            this.navService.updateUserFilter(searchInput, district, userType);
            console.log(apiRoute + filterString);
            this.promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/')
                .then(function (response) {
                this.users = response;
                return response.data;
            });
            return this.promise;
        };
        UsersService.prototype.searchUser = function (userKey) {
            console.log("in searchUser");
            console.log('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey);
            this.promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return this.promise;
        };
        UsersService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
            this.navService.updateUserFilter("", { id: 0, name: "" }, { IgorUserRoleKey: 0, Name: "" });
        };
        UsersService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        UsersService.prototype.getISDList = function () {
            var promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/ISD/')
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.prototype.getDistrictList = function (isdKey) {
            var promise = this.$http.get('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Districts/' + isdKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.$inject = ['$http', 'navigationService'];
        return UsersService;
    }());
    UMPApp.UsersService = UsersService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersService.js.map
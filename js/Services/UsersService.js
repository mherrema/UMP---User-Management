var UMPApp;
(function (UMPApp) {
    var UsersService = (function () {
        function UsersService() {
            this.users = new Array();
            this.filtersActive = false;
        }
        UsersService.prototype.searchUsers = function (searchInput, districtKey, userTypeKey) {
            var apiRoute = "/users";
            var filterString = "?";
            if (searchInput != "") {
                filterString += "SearchInput=" + searchInput;
            }
            if (districtKey != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "DistrictKey=" + districtKey;
            }
            if (userTypeKey != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "UserTypeKey=" + userTypeKey;
            }
            if (filterString == "?") {
                filterString = "";
                this.filtersActive = false;
            }
            else {
                this.filtersActive = true;
            }
            console.log(apiRoute + filterString);
        };
        UsersService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
        };
        UsersService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        return UsersService;
    })();
    UMPApp.UsersService = UsersService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersService.js.map
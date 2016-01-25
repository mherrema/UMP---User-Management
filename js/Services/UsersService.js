var UMPApp;
(function (UMPApp) {
    var UsersService = (function () {
        function UsersService(navService) {
            this.users = new Array();
            this.filtersActive = false;
            this.navService = navService;
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
            if (userType.id != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "UserTypeKey=" + userType.id;
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
        };
        UsersService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
            this.navService.updateUserFilter("", { id: 0, name: "" }, { id: 0, name: "" });
        };
        UsersService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        UsersService.$inject = ['navigationService'];
        return UsersService;
    }());
    UMPApp.UsersService = UsersService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersService.js.map
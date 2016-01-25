var UMPApp;
(function (UMPApp) {
    var TeacherService = (function () {
        function TeacherService() {
            this.teachers = new Array();
            this.filtersActive = false;
        }
        TeacherService.prototype.searchTeachers = function (searchInput, districtKey, schoolKey) {
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
            if (schoolKey != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "SchoolKey=" + schoolKey;
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
        TeacherService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
        };
        TeacherService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        return TeacherService;
    }());
    UMPApp.TeacherService = TeacherService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=TeacherService.js.map
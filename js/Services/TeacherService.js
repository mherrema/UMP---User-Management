var UMPApp;
(function (UMPApp) {
    var TeacherService = (function () {
        function TeacherService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.filtersActive = false;
            this.apiRoot = "http://172.21.255.138";
            // this.apiRoot = "http://win-iq115hn5k0f";
            this.teacherSearchCanceler = $q.defer();
        }
        TeacherService.prototype.searchTeachers = function (searchInput, districtKey, schoolKey) {
            this.teacherSearchCanceler.resolve();
            this.teacherSearchCanceler = this.$q.defer();
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
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Teachers/' + filterString, { timeout: this.teacherSearchCanceler.promise })
                .then(function (response) {
                this.users = response;
                return response.data;
            });
            return promise;
        };
        TeacherService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
        };
        TeacherService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        TeacherService.$inject = ['$http', '$q'];
        return TeacherService;
    }());
    UMPApp.TeacherService = TeacherService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=TeacherService.js.map
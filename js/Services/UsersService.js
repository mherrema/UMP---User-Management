var UMPApp;
(function (UMPApp) {
    "  //\n  // export interface UserType\n  // {\n  //   id: number,\n  //   name: string\n  // }";
    var UsersService = (function () {
        function UsersService($http, $q, navService, notificationService) {
            this.users = new Array();
            this.filtersActive = false;
            this.navService = navService;
            this.$http = $http;
            this.$q = $q;
            this.notificationService = notificationService;
            this.apiRoot = "http://172.21.255.136";
            // this.apiRoot = "http://win-iq115hn5k0f";
            this.userSearchCanceler = $q.defer();
        }
        UsersService.prototype.searchUsers = function (searchInput, district, userType) {
            this.userSearchCanceler.resolve();
            this.userSearchCanceler = this.$q.defer();
            var apiRoute = "/users";
            var filterString = "?";
            if (searchInput != "") {
                filterString += "SearchInput=" + searchInput;
            }
            if (district.DistrictKey != 0) {
                if (filterString != "?") {
                    filterString += "&";
                }
                filterString += "DistrictKey=" + district.DistrictKey;
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
            this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + filterString, { timeout: this.userSearchCanceler.promise })
                .then(function (response) {
                this.users = response;
                return response.data;
            });
            return this.promise;
        };
        UsersService.prototype.searchUser = function (userKey) {
            console.log("in searchUser");
            // console.log('http://win-iq115hn5k0f:37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey);
            this.promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return this.promise;
        };
        UsersService.prototype.deleteUser = function (userKey) {
            console.log("in deleteUser");
            this.promise = this.$http.delete(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/' + userKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return this.promise;
        };
        UsersService.prototype.postUser = function (userToPost) {
            console.log("hi!");
            console.log(userToPost);
            if (userToPost.UserKey != undefined && userToPost.UserKey != 0) {
                var promise = this.$http.put(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/', userToPost)
                    .then(function (response) {
                    console.log(response);
                    return response.data;
                });
            }
            else {
                var promise = this.$http.post(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Users/', userToPost)
                    .then(function (response) {
                    console.log(response);
                    return response.data;
                });
            }
            return promise;
        };
        UsersService.prototype.clearFilters = function () {
            this.shouldClearFilters = true;
            this.navService.updateUserFilter("", { DistrictKey: 0, DistrictName: "" }, { IgorUserRoleKey: 0, Name: "" });
        };
        UsersService.prototype.clearedFilters = function () {
            this.filtersActive = false;
            this.shouldClearFilters = false;
        };
        UsersService.prototype.getISDList = function () {
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/ISD/')
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.prototype.getDistrictList = function (isdKey) {
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Districts/' + isdKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.prototype.getSchoolList = function (districtKeys) {
            console.log("getting schools");
            console.log(districtKeys);
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Schools/' + districtKeys)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.prototype.getSchoolTeacherList = function (schoolKey) {
            console.log("getting school teachers");
            // console.log(districtKeys);
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/SchoolTeachers/' + schoolKey)
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.prototype.getAvailableDistricts = function () {
            var promise = this.$http.get(this.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/AvailableDistricts/')
                .then(function (response) {
                // this.users = response;
                return response.data;
            });
            return promise;
        };
        UsersService.$inject = ['$http', '$q', 'navigationService', 'notificationService'];
        return UsersService;
    }());
    UMPApp.UsersService = UsersService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=UsersService.js.map
///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>
var UMP;
(function (UMP) {
    var Module = (function () {
        function Module(name, modules) {
            this.app = angular.module(name, modules);
            this.app.config(function ($routeProvider) {
                $routeProvider.otherwise({ redirectTo: '/UMP/users' });
            });
        }
        Module.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        Module.prototype.addService = function (name, service) {
            this.app.service(name, service);
        };
        Module.prototype.addFactory = function (name, factory) {
            this.app.factory(name, factory);
        };
        Module.prototype.addRoute = function (url, htmlPath, controller) {
            this.app.config(function ($routeProvider, $animateProvider) {
                $routeProvider.when(url, {
                    templateUrl: htmlPath,
                    controller: controller
                });
            });
        };
        return Module;
    }());
    UMP.Module = Module;
})(UMP || (UMP = {}));
var UMPApp;
(function (UMPApp) {
    if (typeof igorApp !== 'undefined') {
        console.log(typeof igorApp);
        igorApp.requires.push('ngSanitize', 'angular-loading-bar', 'ngAnimate', 'ui.select');
        igorApp.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        igorApp.prototype.addService = function (name, service) {
            this.app.service(name, service);
        };
        igorApp.prototype.addFactory = function (name, factory) {
            this.app.factory(name, factory);
        };
        igorApp.prototype.addRoute = function (url, htmlPath, controller) {
            this.app.config(function ($routeProvider, $animateProvider) {
                $routeProvider.when(url, {
                    templateUrl: htmlPath,
                    controller: controller
                });
            });
        };
    }
    else {
        igorApp = new UMP.Module('UMPApp', ['ngRoute', 'ui.select', 'ngSanitize', 'ngAnimate', 'ui.bootstrap']);
    }
    igorApp.addController('navigationController', UMPApp.NavigationController);
    igorApp.addController('UMPUsersController', UMPApp.UsersController);
    igorApp.addController('UMPUserController', UMPApp.UserController);
    igorApp.addController('UMPTeacherController', UMPApp.TeacherController);
    igorApp.addController('UMPBulkUploadController', UMPApp.BulkUploadController);
    igorApp.addService('navigationService', UMPApp.NavigationService);
    igorApp.addService('usersService', UMPApp.UsersService);
    igorApp.addService('teacherService', UMPApp.TeacherService);
    igorApp.addService('notificationService', UMPApp.NotificationService);
    igorApp.addRoute("/UMP/user", "partials/user.html", "UMPUserController");
    igorApp.addRoute("/UMP/user/:userKey", "partials/user.html", "UMPUserController");
    igorApp.addRoute("/UMP/users", "partials/users.html", "UMPUsersController");
    igorApp.addRoute("/UMP/teachers", "partials/teachers.html", "UMPTeacherController");
    igorApp.addRoute("/UMP/bulkupload", "partials/bulkupload.html", "UMPBulkUploadController");
    igorApp.app.config(function ($animateProvider) {
        $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    });
    igorApp.app.directive('rowLink', ['$location', function ($location) {
            return {
                restrict: 'A',
                link: function (scope, element, attr) {
                    element.attr('style', 'cursor:pointer');
                    element.on('click', function () {
                        $location.path(attr.rowLink);
                        scope.$apply();
                    });
                }
            };
        }]);
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=app.js.map
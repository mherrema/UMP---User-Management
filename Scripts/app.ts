///<reference path="../typings/angularjs/angular.d.ts"/>
///<reference path="../typings/angularjs/angular-route.d.ts"/>

module UMP
{
  export class Module
  {
    app: ng.IModule;

    constructor( name: string, modules: Array< string > )
    {
      this.app = angular.module( name, modules );
      this.app.config(function($routeProvider){
        $routeProvider.otherwise({redirectTo:'/UMP/users'});
      })
    }

    addController( name: string, controller: Function )
    {
      this.app.controller( name, controller );
    }

    addService( name: string, service: Function ): void
    {
      this.app.service( name, service );
    }

    addFactory( name: string, factory: Function ): void
    {
      this.app.factory( name, factory );
    }

    addRoute(url: string, htmlPath: string, controller: string): void
    {
      this.app.config(function($routeProvider, $animateProvider) {
        $routeProvider.when(url, {
          templateUrl : htmlPath,
          controller  : controller
        });
      });
    }
  }

  export interface IRouteParams extends ng.route.IRouteParamsService {
    userKey:string;
 }
}
declare var igorApp: any;

module UMPApp
{

  if(typeof igorApp !== 'undefined'){
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
    // igorApp.app.config(function($routeProvider){
    //   $routeProvider.otherwise({redirectTo:'/users'});
    // })
  }
  else{
    igorApp = new UMP.Module( 'UMPApp', ['ngRoute', 'ui.select', 'ngSanitize', 'ngAnimate', 'ui.bootstrap'] );
  }
  igorApp.addController( 'navigationController', NavigationController );
  igorApp.addController( 'UMPUsersController', UsersController );
  igorApp.addController( 'UMPUserController', UserController );
  igorApp.addController( 'UMPTeacherController', TeacherController );
  igorApp.addController( 'UMPBulkUploadController', BulkUploadController );
  igorApp.addService('navigationService', NavigationService);
  igorApp.addService('usersService', UsersService);
  igorApp.addService('teacherService', TeacherService);
  igorApp.addService('notificationService', NotificationService);
  igorApp.addRoute("/UMP/user", "partials/user.html", "UMPUserController");
  igorApp.addRoute("/UMP/user/:userKey", "partials/user.html", "UMPUserController");
  igorApp.addRoute("/UMP/users", "partials/users.html", "UMPUsersController");
  igorApp.addRoute("/UMP/teachers", "partials/teachers.html", "UMPTeacherController");
  igorApp.addRoute("/UMP/bulkupload", "partials/bulkupload.html", "UMPBulkUploadController");
  igorApp.app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  });
  igorApp.app.directive('rowLink', ['$location', function ($location) {
    return{
      restrict: 'A',
      link: function (scope, element, attr) {
        element.attr('style', 'cursor:pointer');
        element.on('click', function(){
          $location.path(attr.rowLink);
          scope.$apply();
        });
      }
    }
  }]);
}

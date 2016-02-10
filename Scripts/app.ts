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
        $routeProvider.otherwise({redirectTo:'/users'});
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

module UMPApp
{
  var myApp = new UMP.Module( 'UMPApp', ['ngRoute', 'ui.select', 'ngSanitize', 'ngAnimate', 'ui.bootstrap'] );
  myApp.addController( 'navigationController', NavigationController );
  myApp.addController( 'UMPUsersController', UsersController );
  myApp.addController( 'UMPUserController', UserController );
  myApp.addController( 'UMPTeacherController', TeacherController );
  myApp.addController( 'UMPBulkUploadController', BulkUploadController );
  myApp.addService('navigationService', NavigationService);
  myApp.addService('usersService', UsersService);
  myApp.addService('teacherService', TeacherService);
  myApp.addService('notificationService', NotificationService);
  myApp.addRoute("/user", "partials/user.html", "UMPUserController");
  myApp.addRoute("/user/:userKey", "partials/user.html", "UMPUserController");
  myApp.addRoute("/users", "partials/users.html", "UMPUsersController");
  myApp.addRoute("/teachers", "partials/teachers.html", "UMPTeacherController");
  myApp.addRoute("/bulkupload", "partials/bulkupload.html", "UMPBulkUploadController");
  myApp.app.config(function($animateProvider) {
    $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
  });
  myApp.app.directive('rowLink', ['$location', function ($location) {
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

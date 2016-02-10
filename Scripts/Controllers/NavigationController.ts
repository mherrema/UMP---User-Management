///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{



  export interface INavigationScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    // actionsShown: Array< boolean >;
    init: Function;
    clearFilters: Function;
    postUser: Function;
    currentRoute: INavItem;
    isActive: Function;
    filtersActive: boolean;
    shouldShowButton: boolean;
    inUserEdit: boolean;
    inUserNew: boolean;
    myUserType: number;
    godUser: boolean;
    isdUser: boolean;
    districtUser: boolean;
    schoolUser: boolean;
    schoolTeacherUser: boolean;
    classroomUser: boolean;
    deleteUser: Function;
    modalErrorText: string;
    clearErrorText: Function;
    notificationSuccess: boolean;
    notificationText: string;
    notificationActive: boolean;
    currentNotification: Notification;
  }

  export class NavigationController extends BaseController.Controller
  {
    scope: INavigationScope;
    static $inject = ['$scope', '$routeParams', '$timeout', 'navigationService', 'usersService', 'teacherService', 'notificationService'];

    constructor( $scope: INavigationScope, $routeParams: UMP.IRouteParams, $timeout: ng.ITimeoutService,
      navService: NavigationService, usersService: UsersService, teacherService: TeacherService,
    notificationService: NotificationService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        console.log("init navcontroller");
        $scope.notificationActive = false;
        navService.getMyUserType().then(function(d: number){
          console.log(d);
          $scope.myUserType = d;
          $scope.godUser = false;
          $scope.isdUser = false;
          $scope.districtUser = false;
          $scope.schoolUser = false;
          $scope.schoolTeacherUser = false;
          if(d == 0){
            $scope.godUser = true;
          }
          else if(d == 4 || d == 7){
            $scope.isdUser = true;
          }
          else if(d == 3 || d == 6){
            $scope.districtUser = true;
          }
          else if(d == 2 || d == 5){
            $scope.schoolUser = true;
          }
          else{
            $scope.classroomUser = true;
          }
        });
      }

      $scope.$watch(() => navService.currentRoute,
      (newValue: INavItem, oldValue: INavItem) => {
        $scope.currentRoute = newValue;
      });

      $scope.$watch(() => navService.shouldShowButton,
      (newValue: boolean, oldValue: boolean) => {
        $scope.shouldShowButton = newValue;
      });

      $scope.$watch(() => navService.inUserEdit,
      (newValue: boolean, oldValue: boolean) => {
        $scope.inUserEdit = newValue;
      });

      $scope.$watch(() => navService.inUserNew,
      (newValue: boolean, oldValue: boolean) => {
        $scope.inUserNew = newValue;
      });

      $scope.$watch(() => usersService.filtersActive,
      (newValue: boolean, oldValue: boolean) => {
        $scope.filtersActive = newValue;
      });

      $scope.$watch(() => teacherService.filtersActive,
      (newValue: boolean, oldValue: boolean) => {
        $scope.filtersActive = newValue;
      });

      $scope.isActive = function(navName){
        if($scope.currentRoute.name == "User Management" && navName == "Users"){
          return true;
        }
        if($scope.currentRoute.name == "Teacher Lookup" && navName == "Teachers"){
          return true;
        }
        if($scope.currentRoute.name == "Bulk Upload" && navName == "Bulk Upload"){
          return true;
        }
        return false;
      }

      $scope.clearFilters = function(){
        usersService.clearFilters();
        teacherService.clearFilters();
      }

      $scope.postUser = function(){
        navService.postUser();
      }

      $scope.deleteUser = function(){
        usersService.deleteUser($routeParams.userKey).then(function(d: string){
          console.log(d);
          $scope.modalErrorText = "";
          $scope.notificationSuccess = true;
          $scope.notificationText = "Deleted User"
        })
        .catch(function(response) {
          console.error('User Deletion Error', response.status, response.data);
          $scope.modalErrorText = response.data;
        });
      }

      $scope.clearErrorText = function(){
        $scope.modalErrorText = "";
      }
    }

  }
}

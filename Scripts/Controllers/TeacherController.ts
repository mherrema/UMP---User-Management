///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface ITeacherScope extends BaseController.IScope
  {
    init: Function;
    searchTeachers: Function;
    selectDistrict: Function;
    selectSchool: Function;
    districtArray: Array<District>;
    schoolArray: Array<School>;
    selectedDistrict: District;
    selectedSchool: School;
    searchInput: string;
    teachers: Array<Object>;
  }

  export class TeacherController extends BaseController.Controller
  {
    scope: ITeacherScope;
    static $inject = ['$scope', 'navigationService', 'teacherService'];

    actionsShown: Array<boolean>;
    constructor( $scope: ITeacherScope, navService: NavigationService, teacherService: TeacherService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        navService.setCurrentRoute({name: "Teacher Lookup"});
        $scope.districtArray = [
          {id: 0, name: 'Select District'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];
        $scope.selectedDistrict= $scope.districtArray[0];
        $scope.schoolArray = [
          {id: 0, name: 'Select School'},
          {id: 1, name: 'first'},
          {id: 2, name: 'second'},
          {id: 3, name: 'third'},
          {id: 4, name: 'fourth'},
          {id: 5, name: 'fifth'},
        ];
        $scope.selectedSchool = $scope.schoolArray[0];
        this.searchInput = "";
        $scope.teachers = [];

        $scope.teachers = [{
            district :"Cedar Springs Public",
            school :"Cedar Trails Elem School",
            firstName :"E",
            lastName :"Sullivan",
            teacherId:"999",
            scheduleCount:"0"
        },
        {
            district :"Cedar Springs Public",
            school :"Cedar Trails Elem School",
            firstName :"S",
            lastName :"Sendler",
            teacherId:"995",
            scheduleCount:"0"
        },
        {
            district :"Cedar Springs Public",
            school:"Cedar Trails Elem School",
            firstName:"A",
            lastName :"Secor",
            teacherId:"994",
            scheduleCount:"0"
        }];
        console.log("init teachers");
      }

      $scope.$watch(() => $scope.searchInput,
      (newValue: string, oldValue: string) => {
        $scope.searchTeachers();
      });

      $scope.$watch(() => teacherService.shouldClearFilters,
      (newValue: boolean, oldValue: boolean) => {
        if(newValue){
          $scope.searchInput = "";
          $scope.selectedDistrict = {id: 0, name: "Select District"};
          $scope.selectedSchool = {id: 0, name: "Select School"};
          teacherService.clearedFilters();
        }
      });

      $scope.searchTeachers = function(){
        teacherService.searchTeachers($scope.searchInput, $scope.selectedDistrict.id, $scope.selectedSchool.id);
      }

      $scope.selectDistrict = function(item, model){
        // if($scope.selectedDistrict != item){
          $scope.searchTeachers();
        // }
      }

      $scope.selectSchool = function(item, model){
        // if($scope.selectedUserType != item){
          $scope.searchTeachers();
        // }
      }
    }
  }
}

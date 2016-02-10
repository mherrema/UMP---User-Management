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
    teachers: Array<ITeacher>;
  }

  export class TeacherController extends BaseController.Controller
  {
    scope: ITeacherScope;
    static $inject = ['$scope', 'navigationService', 'teacherService', 'usersService'];

    actionsShown: Array<boolean>;
    constructor( $scope: ITeacherScope, navService: NavigationService, teacherService: TeacherService, usersService: UsersService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        navService.setCurrentRoute({name: "Teacher Lookup"});
        navService.updateUserFilter("", {DistrictKey: 0, DistrictName: ""}, {IgorUserRoleKey: 0, Name: ""});
        $scope.districtArray = [];
        $scope.districtArray.push({DistrictKey: 0, DistrictName: 'Select District'});
        $scope.selectedDistrict= $scope.districtArray[0];
        usersService.getAvailableDistricts().then(function(d: Array<District>){
          $scope.districtArray = d;
          $scope.districtArray.unshift({DistrictKey: 0, DistrictName: 'Select District'});
        });
        $scope.schoolArray = [];
        $scope.schoolArray.push({DistrictKey: 0, SchoolKey: 0, SchoolName: ''});
        $scope.selectedSchool = $scope.schoolArray[0];

        this.searchInput = "";
        $scope.teachers = [];
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
          teacherService.clearedFilters();
          $scope.selectedDistrict = $scope.districtArray[0];
          $scope.selectedSchool = $scope.schoolArray[0];
          $scope.searchTeachers();
        }
      });

      $scope.searchTeachers = function(){
        teacherService.searchTeachers($scope.searchInput, $scope.selectedDistrict.DistrictKey, $scope.selectedSchool.SchoolKey).then(function(d: Array<ITeacher>){
          console.log(d);
          $scope.teachers = d;
        });
      }

      $scope.selectDistrict = function(item, model){
        $scope.searchTeachers();
        usersService.getSchoolList(item.DistrictKey).then(function(d: Array<School>){
          $scope.schoolArray = d;
          $scope.schoolArray.unshift({DistrictKey: 0, SchoolName: 'Select School', SchoolKey: 0});
          $scope.selectedSchool = $scope.schoolArray[0];
        });
      }

      $scope.selectSchool = function(item, model){
        $scope.searchTeachers();
      }
    }
  }
}

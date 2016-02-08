///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface User
  {
    Email: string;
    Username: string;
    FirstName: string;
    LastName: string;
    Password: string;
    UserType: UserType;
    IsLockedOut: boolean;
    SignedUserAgreement: boolean;
    AdditionalRoles: AdditionalRoles;
    Comments: string;
    Districts: Array<District>;
    ISD: ISD;
    Schools: Array<School>;
    Roles: Array<string>;
    Teachers: Array<SchoolTeacher>
  }

  export interface UserType
  {
    IgorUserRoleKey: number;
    Name: string;
  }

  export interface AdditionalRoles{
    InGAAssessmentCreator: boolean;
    InGAAssessmentScoreEntry: boolean;
    UMPUser: boolean;
    CohortBuilder: boolean;
    CohortPublisher: boolean;
  }

  export interface IUserScope extends BaseController.IScope
  {
    init: Function;
    toggleShowPassword: Function;
    hidePasswordFields: boolean;
    inNewUser: boolean;
    email: string;
    additionalRoles: AdditionalRoles;
    districtArray: Array<District>;
    isdArray: Array<ISD>;
    schoolArray: Array<School>;
    userType: string;
    selectUserType: Function;
    isdUser: boolean;
    districtUser: boolean;
    schoolUser: boolean;
    classroomUser: boolean;
    resetSelectedOptions: Function;
    selectISD: Function;
    selectDistrict: Function;
    selectSchool: Function;
    removeDistrict: Function;
    ISD: ISD;
    districts: Array<District>;
    schools: Array<School>;
    isLockedOut: boolean;
    signedUserAgreement: boolean;
    user: User;
    formValid: boolean;
    checkValidity: Function;
    postUser: Function;
    errorMessage: string;
    selectSchoolTeacher: Function;
    setupUser: Function;
  }

  export class UserController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', '$routeParams', 'navigationService', 'usersService'];

    constructor( $scope: IUserScope, $routeParams: UMP.IRouteParams, navService: NavigationService, usersService: UsersService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        if($routeParams.userKey != "" && $routeParams.userKey != undefined){
          navService.setCurrentRoute({name: "Edit User"});
          $scope.inNewUser = false;
          usersService.searchUser($routeParams.userKey).then(function(d: User){
            console.log(d);
            $scope.user = d;
            $scope.setupUser();
          });
          usersService.getISDList().then(function(d: Array<ISD>){
            console.log(d);
            $scope.isdArray = d;
            if($scope.user != null){
              $scope.ISD = $scope.user.ISD;
            }
          })
        }
        else{
          $scope.user = {
            Email: "",
            Username: "",
            FirstName: "",
            LastName: "",
            Password: "",
            UserType: {IgorUserRoleKey: 0, Name: ""},
            IsLockedOut: false,
            SignedUserAgreement: false,
            AdditionalRoles: {
              InGAAssessmentCreator: false,
              InGAAssessmentScoreEntry: false,
              UMPUser: false,
              CohortBuilder: false,
              CohortPublisher: false,
            },
            Comments: "",
            Districts: [],
            ISD: {ISDKey: 0, ISDName: ""},
            Schools: [],
            Roles: [],
            Teachers: []
          };
          navService.setCurrentRoute({name: "Add User"});
          $scope.inNewUser = true;
          usersService.getISDList().then(function(d: Array<ISD>){
            console.log(d);
            $scope.isdArray = d;
            if($scope.user != null){
              $scope.ISD = $scope.user.ISD;
            }
          })
        }

        $scope.hidePasswordFields = true;
        $scope.additionalRoles = {
          InGAAssessmentCreator: false,
          InGAAssessmentScoreEntry: false,
          UMPUser: false,
          CohortBuilder: false,
          CohortPublisher: false
        };
        $scope.districtArray = [];
        $scope.isdArray = [];
        $scope.schoolArray = [];
        // $scope.user.districts = [];
      }

      $scope.setupUser = function(){
        $scope.user.AdditionalRoles = {
          InGAAssessmentCreator: false,
          InGAAssessmentScoreEntry: false,
          UMPUser: false,
          CohortBuilder: false,
          CohortPublisher: false
        }
        if($scope.user.Roles.indexOf("UMP User Role") > -1){
          $scope.user.AdditionalRoles.UMPUser = true;
        }
        if($scope.user.Roles.indexOf("InGA Assessment Creator Role") > -1){
          $scope.user.AdditionalRoles.InGAAssessmentCreator = true;
        }
        if($scope.user.Roles.indexOf("InGA Assessment Score Entry Role") > -1){
          $scope.user.AdditionalRoles.InGAAssessmentScoreEntry = true;
        }
        if($scope.user.Roles.indexOf("Cohort Builder Role") > -1){
          $scope.user.AdditionalRoles.CohortBuilder = true;
        }
        if($scope.user.Roles.indexOf("Cohort Publisher Role") > -1){
          $scope.user.AdditionalRoles.CohortPublisher = true;
        }

        $scope.userType = String($scope.user.UserType.IgorUserRoleKey);
        $scope.selectUserType();

        // if($scope.isdArray.length == 0){
        //   $scope.isdArray.push($scope.user.ISD);
        // }
        $scope.ISD = $scope.user.ISD;

        if($scope.districtArray.length == 0){
          usersService.getDistrictList(String($scope.ISD.ISDKey)).then(function(d: Array<District>){
            console.log(d);
            $scope.districtArray = d;
            // remove already selected
            // for(var i = 0; i< $scope.user.Districts.length; i++){
            //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
            //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
            //   }
            // }

          })
          // for(var i = 0; i< $scope.user.Districts.length; i++){
          //   $scope.districtArray.push($scope.user.Districts[i]);
          // }
        }

        if($scope.schoolArray.length == 0){
          // for(var i = 0; i< $scope.user.Schools.length; i++){
          //   $scope.schoolArray.push($scope.user.Schools[i]);
          // }
          // $scope.ISD = String($scope.user.ISD.ISDKey);
          var districts = "";
          for(var i = 0; i < $scope.user.Districts.length; i++){
            districts += $scope.user.Districts[i].DistrictKey;
            if(i< $scope.user.Districts.length-1){
              districts += ",";
            }
          }
          console.log(districts);
          usersService.getSchoolList(districts).then(function(d: Array<School>){
            console.log(d);
            $scope.schoolArray = d;
            // remove already selected
            // for(var i = 0; i< $scope.user.Districts.length; i++){
            //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
            //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
            //   }
            // }

          })
        }

        if($scope.user.Teachers.length > 0){
          for(var j = 0; j< $scope.user.Schools.length; j++){
            for(var i = 0; i< $scope.user.Teachers.length; i++){
              if($scope.user.Teachers[i].SchoolKey == $scope.user.Schools[j].SchoolKey){
                if($scope.user.Schools[j].schoolTeachers == undefined){
                  $scope.user.Schools[j].schoolTeachers = [];
                }
                if($scope.user.Schools[j].selectedTeachers == undefined){
                  $scope.user.Schools[j].selectedTeachers = [];
                }
                $scope.user.Schools[j].schoolTeachers.push($scope.user.Teachers[i]);
                $scope.user.Schools[j].selectedTeachers.push($scope.user.Teachers[i]);
              }
            }
            usersService.getSchoolTeacherList(String($scope.user.Schools[j].SchoolKey)).then(function(d: Array<SchoolTeacher>){
              if(d.length > 0){
                for(var k = 0; k< $scope.user.Schools.length; k++){
                  if($scope.user.Schools[k].SchoolKey == d[0].SchoolKey){
                    $scope.user.Schools[k].schoolTeachers = d;
                  }
                }
              }
            });
          }
        }
        else if($scope.user.Schools.length > 0){
          for(var j = 0; j< $scope.user.Schools.length; j++){
            usersService.getSchoolTeacherList(String($scope.user.Schools[j].SchoolKey)).then(function(d: Array<SchoolTeacher>){
              if(d.length > 0){
                for(var k = 0; k< $scope.user.Schools.length; k++){
                  if($scope.user.Schools[k].SchoolKey == d[0].SchoolKey){
                    $scope.user.Schools[k].schoolTeachers = d;
                  }
                }
              }
            });
          }
        }

      }

      $scope.$watch(() => navService.shouldPostUser,
      (newValue: boolean, oldValue: boolean) => {
        if(newValue){
          console.log("should post user");
          $scope.postUser();
          navService.shouldPostUser = false;
        }
      });

      $scope.toggleShowPassword = function(){
        $scope.hidePasswordFields = !$scope.hidePasswordFields;
      }

      $scope.selectUserType = function(){
        // console.log($scope.user.userType);
        var userType = $scope.userType;
        $scope.resetSelectedOptions();
        if(userType == "4" || userType == "7"){
          $scope.isdUser = true;
          $scope.districts = [];
          $scope.schools = [];
        }
        if(userType == "3" || userType == "6"){
          $scope.districtUser = true;
          $scope.schools = [];
        }
        if(userType == "2" || userType == "5"){
          $scope.schoolUser = true;
        }
        if(userType == "1"){
          $scope.classroomUser = true;
        }
      }

      $scope.resetSelectedOptions = function(){
        $scope.isdUser = false;
        $scope.districtUser = false;
        $scope.schoolUser = false;
        $scope.classroomUser = false;
      };

      $scope.selectISD = function(){
        $scope.user.Districts = [];
        $scope.user.Schools = [];
        console.log("should update districts");
        usersService.getDistrictList(String($scope.ISD.ISDKey)).then(function(d: Array<District>){
          console.log(d);
          $scope.districtArray = d;
          // remove already selected
          // for(var i = 0; i< $scope.user.Districts.length; i++){
          //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
          //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
          //   }
          // }

        })
      }

      $scope.selectDistrict = function(item, model){
        // $scope.user.schools = [];
        var districts = "";
        for(var i = 0; i < $scope.user.Districts.length; i++){
          districts += $scope.user.Districts[i].DistrictKey;
          if(i< $scope.user.Districts.length-1){
            districts += ",";
          }
        }
        console.log(districts);
        usersService.getSchoolList(districts).then(function(d: Array<School>){
          console.log(d);
          $scope.schoolArray = d;
          // remove already selected
          // for(var i = 0; i< $scope.user.Districts.length; i++){
          //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
          //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
          //   }
          // }

        })

        /**********
        *
        *     Get all schools with selected districts, filter out already selected
        *
        ***********/
      }

      $scope.removeDistrict = function(item, model){
        // var schoolsToRemove = [];
        for(var i = $scope.user.Schools.length-1; i > -1; i--){
          if($scope.user.Schools[i].DistrictKey == item.DistrictKey){
            // schoolsToRemove.push($scope.user.schools[i].id);
            $scope.user.Schools.splice(i, 1);
          }
        }
        var districts = "";
        for(var i = 0; i < $scope.user.Districts.length; i++){
          districts += $scope.user.Districts[i].DistrictKey;
          if(i< $scope.user.Districts.length-1){
            districts += ",";
          }
        }
        console.log(districts);
        if(districts != ""){
          usersService.getSchoolList(districts).then(function(d: Array<School>){
            console.log(d);
            $scope.schoolArray = d;
            // remove already selected
            // for(var i = 0; i< $scope.user.Districts.length; i++){
            //   if($scope.districtArray.indexOf($scope.user.Districts[i]) > -1){
            //     $scope.districtArray.splice($scope.districtArray.indexOf($scope.user.Districts[i]), 1);
            //   }
            // }

          })
        }
      }

      $scope.selectSchool = function(item, model){
        console.log(item);
        // console.log($scope.user.schools);
        // for(var i = 0; i< $scope.user.Schools.length; i++){
        //   if($scope.user.Schools[i].SchoolName == item.name){
        //     if(!$scope.user.Schools[i].schoolTeachers || $scope.user.Schools[i].schoolTeachers.length == 0){
        //       //search for teachers at that school
        //       $scope.user.Schools[i].schoolTeachers = [
        //         // {id: 1, name: 'firstTeacher', schoolId: 1},
        //         // {id: 2, name: 'secondTeacher', schoolId: 1},
        //         // {id: 3, name: 'thirdTeacher', schoolId: 1},
        //         // {id: 4, name: 'fourthTeacher', schoolId: 1},
        //         // {id: 5, name: 'fifthTeacher', schoolId: 1}
        //       ];
        //     }
        //   }
        // }
        usersService.getSchoolTeacherList(item.SchoolKey).then(function(d: Array<SchoolTeacher>){
          for(var i = 0; i< $scope.user.Schools.length; i++){
            if($scope.user.Schools[i].SchoolKey == item.SchoolKey){
              $scope.user.Schools[i].schoolTeachers = d;
            }
          }
        });
      }

      $scope.checkValidity = function(){
        var valid = true;
        var user = $scope.user;
        $scope.errorMessage = "";
        if(user == undefined){
          $scope.errorMessage = "Please fill out the form";
          return false;
        }
        if(!user.Email){
          $scope.errorMessage = "Invalid Email Format";
          return false;
        }
        if(!user.Username || user.Username == "" || !user.FirstName || user.FirstName == "" || !user.LastName || user.LastName == ""){
          $scope.errorMessage = "One of the name fields are empty";
          return false;
        }
        if($scope.inNewUser && user.Password == ""){
          $scope.errorMessage = "Password is empty";
          return false;
        }
        if(user.UserType == undefined){
          $scope.errorMessage = "Select A User Type";
          return false;
        }
        // if(user.UserType == "4" || user.UserType == "7"){
        //   if(!user.isd){
        //     $scope.errorMessage = "You have to belong to an ISD";
        //     return false;
        //   }
        // }
        // if(user.UserType == "3" || user.UserType == "6"){
        //   if(!user.districts || user.districts.length == 0){
        //     $scope.errorMessage = "You have to belong to an District";
        //     return false;
        //   }
        // }
        // if(user.UserType == "2" || user.UserType == "5"){
        //   if(!user.schools || user.schools.length == 0){
        //     $scope.errorMessage = "You have to belong to an School";
        //     return false;
        //   }
        // }
        return true;
        /////////// classroom user login - ask about
        // if(user.userType == "1"){
        //
        //   if(!user.schools || user.districts.length == 0){
        //     return false;
        //   }
        // }
      }

      $scope.postUser = function(){
        console.log("here")
        if($scope.checkValidity()){
          //post user

          for(var i = 0; i< $scope.user.Schools.length; i++){
            $scope.user.Schools[i].schoolTeachers = [];
          }
          console.log($scope.user);
        }
        else{

        }
      }

      $scope.selectSchoolTeacher = function(item, school){
        console.log(item);
        console.log(school);
        if(!school.selectedTeachers){
          school.selectedTeachers = [item];
        }
        else{
          school.selectedTeachers.push(item);
        }
        // for(var i = 0; i< )
      }

    }

  }
}

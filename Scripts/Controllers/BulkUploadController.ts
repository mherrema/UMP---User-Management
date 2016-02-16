///<reference path="../../typings/angularjs/angular.d.ts"/>
///<reference path="../../typings/angularjs/angular-route.d.ts"/>

module UMPApp
{

  export interface BulkUploadUser
  {
    ISDCode: number;
    ISDName: string;
    DistrictCode: Array<number>;
    DistrictName: string;
    Schools: Array<BulkUploadSchool>;
    SchoolTeachers: Array<BulkUploadTeacher>;
    UserType: string;
    Email: string;
    FirstName: string;
    LastName: string;
    InGAScoreEntry: string;
    InGAAssessmentCreator: string;
    CohortBuilder: string;
    CohortPublisher: string;
    UserAgreement: string;
    IsRowValid: boolean;
  }

  export interface BulkUploadSchool
  {
    SchoolCode: string;
    SchoolName: string;
    DistrictCode: string;
  }

  export interface BulkUploadTeacher
  {
    TeacherCode: string;
    FirstName: string;
    LastName: string;
    SchoolCode: string;
  }

  export interface IBulkUploadScope extends BaseController.IScope
  {
    // activityItems: Array< IActivityItem >;
    actionsShown: Array< boolean >;
    init: Function;
    setFiles: Function;
    file: Object;
    startUpload: Function;
    uploadUsers: Function;
    userArray: Array<BulkUploadUser>;
    apiRoot: string;
    errors: boolean;
    uploaded: boolean;
    uploadedCount: number;
  }

  export class BulkUploadController extends BaseController.Controller
  {
    scope: IUserScope;
    static $inject = ['$scope', '$http', '$filter', 'navigationService'];

    actionsShown: Array<boolean>;
    constructor( $scope: IBulkUploadScope, $http: ng.IHttpService, $filter: ng.IFilterService, navService: NavigationService)
    {
      super( $scope );

      var controller = this;

      $scope.init = function(){
        navService.setCurrentRoute({name: "Bulk Upload"});
        // navService.updateUserFilter("", {id: 0, name: ""}, {id: 0, name: ""});
        // this.apiRoot = "http://172.21.255.136";
        $scope.apiRoot = "http://win-iq115hn5k0f";
      }

      $scope.setFiles = function(element) {
        $scope.$apply(function(scope) {
          console.log('files:', element.files);
          // Turn the FileList object into an Array
          $scope.file = element.files;
          // for (var i = 0; i < element.files.length; i++) {
          //   $scope.file.push(element.files[i])
          // }
          // scope.progressVisible = false
        });
      };

      $scope.startUpload = function() {
        var r = new FileReader();
        r.onload = function(e) {
          var csvContents = r.result;
          $scope.$apply(function () {
            var lines, length;
            $scope.userArray = [];
            lines = csvContents.split('\n');

            for (var i = 1; i < lines.length; i++) {
              var l = lines[i];

              // data = l.split(',(?=([^\"]*\"[^\"]*\")*[^\"]*$)');
              var data = [];
              var start = 0;
              var inQuotes = false;
              for (var current = 0; current < l.length; current++) {
                if (l.charAt(current) == '\"') inQuotes = !inQuotes; // toggle state
                var atLastChar = (current == l.length - 1);
                if(atLastChar) data.push(l.substring(start));
                else if (l.charAt(current) == ',' && !inQuotes) {
                  data.push(l.substring(start, current));
                  start = current + 1;
                }
              }

              if(data.length == 13){
              var isdCode = data[0];
              var districtCode = data[1];
              var schoolCodesString = data[2].replace(/[\u201C\u201D\"\']/g,"");
              var teacherNumbersString = data[3].replace(/[\u201C\u201D\"\']/g,"");
              var userType = data[4];
              var email = data[5];
              var firstName = data[6];
              var lastName = data[7];
              var InGAScoreEntry = data[8];
              var InGAAssessmentCreator = data[9];
              var CohortBuilder = data[10];
              var CohortPublisher = data[11];
              var UserAgreement = data[12];

              // var districtKeys = districtKeysString.split(',');
              var schoolCodes = schoolCodesString.split(',');
              var schools = [];
              for(var j = 0; j< schoolCodes.length; j++){
                if(schoolCodes[j] != ""){
                schools.push({SchoolCode: schoolCodes[j]});
              }
              }
              var teacherNumbers = teacherNumbersString.split(',');
              var teachers = [];
              for(var k = 0; k< teacherNumbers.length; k++){
                if(teacherNumbers[k] != ""){
                teachers.push({TeacherNumber: teacherNumbers[k]});
              }
              }

              $scope.userArray.push({
                ISDCode: isdCode,
                ISDName: "",
                DistrictCode: districtCode,
                DistrictName: "",
                Schools: schools,
                SchoolTeachers: teachers,
                UserType: userType,
                Email: email,
                FirstName: firstName,
                LastName: lastName,
                InGAScoreEntry: InGAScoreEntry,
                InGAAssessmentCreator: InGAAssessmentCreator,
                CohortBuilder: CohortBuilder,
                CohortPublisher: CohortPublisher,
                UserAgreement: UserAgreement,
                IsRowValid: true
              });
            }

            };
            console.log($scope.userArray);
            $http.post($scope.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/VerifyUsers/', $scope.userArray)
            .then(function(response){
              $scope.userArray = response.data as Array<BulkUploadUser>;
              $scope.errors = false;
              for(var l = 0; l < $scope.userArray.length; l++){
                if(!$scope.userArray[l].IsRowValid){
                  $scope.errors = true;
                }
              }
              // return response.data;
            });
          });
        };

        r.readAsText($scope.file[0]);
      }

      $scope.uploadUsers = function(){
        $http.post($scope.apiRoot + ':37913/_vti_bin/UMPApplicationService/UMPApplicationService.svc/Upload/', $scope.userArray)
        .then(function(response){
          console.log(response);
          // return response.data;
          $scope.uploaded = true;
          $scope.uploadedCount = 5;
        })
        .catch(function(response) {
          console.error('Gists error', response.status, response.data);
        })
        .finally(function() {
          console.log("finally finished gists");
        });
      }
    }

    // setActionsShown(input: Array< boolean >):void{
    //   this.actionsShown = input;
    // }
    //
    // closeActions():void
    // {
    //   for(var index in this.actionsShown){
    //     this.actionsShown[index] = false;
    //   }
    // }
    //
    // toggleActions(index:number)
    // {
    //   //close if selecting one already open
    //   if(this.actionsShown[index]){
    //     this.actionsShown[index] = false;
    //   }
    //   //close all and open
    //   else
    //   {
    //     this.closeActions();
    //     this.actionsShown[index] = true;
    //   }
    // }

  }
}

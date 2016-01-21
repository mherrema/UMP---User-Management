module UMPApp
{
  export interface ITeacher
  {
    name: string,
    url: string,
  }

  export class TeacherService
  {
    teachers: Array<ITeacher>;
    shouldClearFilters: boolean;
    filtersActive: boolean;
    constructor()
    {
      this.teachers = new Array<ITeacher>();
      this.filtersActive = false;
    }

    searchTeachers(searchInput: string, districtKey: number, schoolKey: number): void
    {
      var apiRoute = "/users";
      var filterString = "?";

      if(searchInput != ""){
        filterString+= "SearchInput=" + searchInput;
      }

      if(districtKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "DistrictKey=" + districtKey;
      }

      if(schoolKey != 0){
        if(filterString != "?"){
          filterString += "&";
        }
        filterString += "SchoolKey=" + schoolKey;
      }

      if(filterString == "?"){
        filterString = "";
        this.filtersActive = false;
      }
      else{
        this.filtersActive = true;
      }

      console.log(apiRoute + filterString);

    }

    clearFilters() :void
    {
      this.shouldClearFilters = true;
    }

    clearedFilters() :void
    {
      this.filtersActive = false;
      this.shouldClearFilters = false;
    }
  }
}

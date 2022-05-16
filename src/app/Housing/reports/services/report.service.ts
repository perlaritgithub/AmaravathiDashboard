
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // Api = 'https://polavaramrr.ap.gov.in:6781/housingdashboardapp/'
  Api='http://localhost:9876/nodeapp/';
  
  constructor(private http: HttpClient) { }

/////////////////////////////////////////////////////////////////////////////////////////////////////

  statusChangeAlert(message) {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  
  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      timer: 1500
    })
  }
  
  
  errorMessageAlert(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: true,
      timer: 1500
    })
  }

///////////////////////////////////////////////////////////////////////////////

districtdata(){
  return this.http.get<any>(this.Api + `districtdata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

getdivisiondata(){
  return this.http.get<any>(this.Api + `getdivisiondata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

getcolonynames(){
  return this.http.get<any>(this.Api + `getcolonyname`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

getreportdata(){
  return this.http.get<any>(this.Api + `getreport`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
changedivisiondata(district){
  return this.http.get<any>(this.Api + `changedivisiondata/`+ district).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
changecolonydata(division){
  return this.http.get<any>(this.Api + `changecolonydata/`+ division).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
changehabitationdata(colony_name){
  return this.http.get<any>(this.Api + `changehabitationdata/`+ colony_name).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

searchdata(district,division,colony_name){
  return this.http.get<any>(this.Api + `searchdata/`+ district + '/' + division + '/' + colony_name ).pipe(map(res => {
    return res;
  
  }, error => {
    this.errorAlert();
    return error;
  }));

}
///////////////////////////////////////////////////////////////////////////////////
gethousedata(){
  return this.http.get<any>(this.Api + `gethousedata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

gettoiletdata(){
  return this.http.get<any>(this.Api + `gettoiletdata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));

}
getinfradata(){

  return this.http.get<any>(this.Api + `getinfradata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));


}
////////////////////////////////////////////////////////////////////////////////////
gethabitationddropdown(){
  return this.http.get<any>(this.Api + `gethabitationdropdown`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
gethabitationreport(){
  return this.http.get<any>(this.Api + `gethabitationreport`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

searchhabitation(habitation_name){
  return this.http.get<any>(this.Api + `searchhabitation/`+habitation_name).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));

}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// department wise analysis

getdepartmentdropdown(){
  return this.http.get<any>(this.Api + `getdepartmentdropdown`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
getdepartmentreport(){
  return this.http.get<any>(this.Api + `getdepartmentreport`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

searchdepartment(department){
  console.log(department);
  return this.http.get<any>(this.Api + `searchdepartment/`+ department).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));

}
}

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  // chartApi = 'https://polavaramrr.ap.gov.in:6781/housingdashboardapp/'

  chartApi ='http://localhost:9876/nodeapp/'


//////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////
  // geteventcount(){
  //   return this.http.get<any>(this.chartApi + `getcount`).pipe(map(res => {
  //     return res;
  //   }, error => {
  //     // this.errorAlert();
  //     return error;
  //   }));


  // }

  // geteventdata(){

  //     return this.http.get<any>(this.chartApi + `geteventdata`).pipe(map(res => {
  //     return res;
  //   }, error => {
  //     // this.errorAlert();
  //     return error;
  //   }));

  // }


  getcounts(){
    return this.http.get<any>(this.chartApi + `getcounts`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  gettoiletscounts(){
    return this.http.get<any>(this.chartApi + `gettoilets`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  getinfracounts(){
    return this.http.get<any>(this.chartApi + `getinfracounts`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  gethouseanalysis(){
    return this.http.get<any>(this.chartApi + `gethouseanalysis`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  gettoiletanalysis(){
    return this.http.get<any>(this.chartApi + `gettoiletanalysis`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }
  
 getinfraanalysis(){
  return this.http.get<any>(this.chartApi + `getinfraanalysis`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
 }

 departmenthouseanalysis(){
  return this.http.get<any>(this.chartApi + `departmenthousecount`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));

 }

 departmenttoiletanalysis(){
  return this.http.get<any>(this.chartApi + `departmenttoiletcount`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
 }

 departmentinfraanalysis(){
  return this.http.get<any>(this.chartApi + `departmentinfracount`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
 }
 westgodavaridata(){
  return this.http.get<any>(this.chartApi + `westgodavaridata`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
 }

}

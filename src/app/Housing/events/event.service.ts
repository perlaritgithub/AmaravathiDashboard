import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class EventService {

  // eventApi  = environment.aromaApiURL;
  eventApi = 'http://localhost:9876/nodeapp/'
  constructor(private http: HttpClient) { }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

  addeventSubmit(data){
    return this.http.post<any>(this.eventApi + `postaddeventmethod`, data).pipe(map(res => {
      this.statusChangeAlert(' Offers Added Successfully');
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));
  }

  getaddedeventdata(){
    return this.http.get<any>(this.eventApi + `geteventdata`).pipe(map(res => {
      return res;
    }, error => {
      this.errorAlert();
      return error;
    }));


  }

  updateEventData(id){
    return this.http.post<any>(this.eventApi + `updateeventdata`, id).pipe(map(res => {
      // console.log(res.data);
      this.statusChangeAlert(' Updated Successfully')
      return res;
    }, error => {
      // this.errorAlert();
      return error;
    }));
  }

  deleteevent(id){
    return this.http.get<any>(this.eventApi + `deleteevent/` + id).pipe(map(res => {
      // console.log(res.data);
      this.statusChangeAlert('User Deleted Successfully')
      return res;
    }, error => {
      // this.errorAlert();
      return error;
    }));
  
  }

  
}

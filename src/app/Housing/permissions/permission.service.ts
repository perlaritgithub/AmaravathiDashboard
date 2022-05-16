import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import  Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  PermissionApi  = 'http://localhost:9876/nodeapp/';
  constructor(private http: HttpClient) { }

/////////////////success and Error Alerts//////////
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

///////////////////////End//////////////////////////


////create user start////////
getAllUsersData() {
  return this.http.get<any>(this.PermissionApi + `getusrs`).pipe(map(res => {
    return res;
  }, error => {
    // this.errorAlert();
    return error;
  }));
}


addUserFormData(data) {
  return this.http.post<any>(this.PermissionApi + `addusrs`, data).pipe(map(res => {
    // console.log(res.data);
    if (res.status == '300') {
      this.statusChangeAlert('user already Exists')
  } else {
    this.statusChangeAlert('User Added Successfully')
  }
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

updateUserFormData(data) {
  return this.http.post<any>(this.PermissionApi + `updateUserDetails`, data).pipe(map(res => {
    // console.log(res.data);
    this.statusChangeAlert('User Updated Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

deleteUser(index) {

  return this.http.get<any>(this.PermissionApi + `deleteUsr/` + index).pipe(map(res => {
    // console.log(res.data);
    this.statusChangeAlert('User Deleted Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}
//////create user end////////////////
////////////////////////Add permissions start///////

getAllPermissionsData() {
  return this.http.get<any>(this.PermissionApi + `getusrs`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

getAllUserPermissionsData(index) {
  return this.http.get<any>(this.PermissionApi + `getMenuCatgrypermissions/` + index).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}


submitAllPermissionsData(data) {
  return this.http.post<any>(this.PermissionApi + `sendpermissions` , data).pipe(map(res => {
    this.statusChangeAlert('User Permissions Added Successfully')
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

///////////////////////add permissions end////////


////////view permissions start ///////



getAllViewPermissionsData() {
  return this.http.get<any>(this.PermissionApi + `getpermissionDlts`).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

getUserPermissionsData(index) {
  return this.http.get<any>(this.PermissionApi + `permsListDlts/`+ index).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}

deletePermissionsData(index) {
  return this.http.get<any>(this.PermissionApi + `deletepermDlts/`+ index).pipe(map(res => {
    return res;
  }, error => {
    this.errorAlert();
    return error;
  }));
}


//////view permissions end ///////




}

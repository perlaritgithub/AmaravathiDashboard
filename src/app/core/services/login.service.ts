import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../model/login.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


// var LoginApi = 'http://92.204.139.190:3874/nodeapp/'
//  var LoginApi: string = 'http://aromacares.in:2302/nodeapp/'
  //  var  LoginApi  = environment.aromaApiURL;

var LoginApi = 'http://localhost:9876/nodeapp/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject : BehaviorSubject<LoginModel>;   // current subject by default
  public currentUser         : Observable<LoginModel>;        // Emmiting value when changes occures
  loginData                  : LoginModel;                    // Login Model Data

  constructor(private http: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<LoginModel>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser        = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
      return this.currentUserSubject.value;
  }

  // Login method for submitting login form data value

  login(signInData: LoginModel) {
    // console.log(usr_nm,usr_pwd);

    return this.http.post<any>( LoginApi + 'getUsrloginCtrls',  signInData)
        .pipe(map(user => {
          localStorage.setItem('un', signInData.usr_nm.toString());
          localStorage.setItem('usr_nm', user.usr_data[0].usr_nm);
          localStorage.setItem('usr_email', user.usr_data[0].usr_email);
            console.log(user);
               var result
               result = Object.values(user.data.reduce((r,o) => {
              r[o.menu_ctgry_id] = r[o.menu_ctgry_id] || {'menu_cat_id': o.menu_cat_id, 'menu_id': o.menu_id,  'menu_cat_nm': o.menu_cat_nm, 'menu_state_icon' : o.menu_state_icon, 'menu_cat_icon': o.menu_cat_icon, 'serial_no': o.serial_no, 'reportdata' : []};
              r[o.menu_ctgry_id]['reportdata'].push({ 'carrer_menu_id': o.carrer_menu_id ,'menu_id' : o.menu_id, 'mainMenu': o.menu_cat_nm, 'menu_nm': o.menu_nm, 'menu_state': o.menu_state_nm, 'serial_no': o.serial_no, 'menu_state_icon': o.menu_state_icon });
              return r;
            }, {}));
               this.loginData = result
              console.log(this.loginData);

            // login successful if there's a jwt token in the response
            if (this.loginData && this.loginData) {
                // store this.loginData details and jwt token in local storage to keep this.loginData logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(this.loginData));
                localStorage.setItem('usr_id', user.data[0].usr_id);


                localStorage.setItem('permission', JSON.stringify(user.data) );
                this.currentUserSubject.next(this.loginData);
            }

            return this.loginData;
        }));
}

  // logout function when user want to logout

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.clear();
    // this.currentUserSubject.next(null);
    this.router.navigate(['/auth/signin2']);
}
}

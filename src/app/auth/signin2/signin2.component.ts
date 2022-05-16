import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from './../../core/services/login.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss']
})
export class Signin2Component implements OnInit {
  loginForm  : FormGroup;                // Form Group for Login Form
  submitted  : boolean   = false;        // Submitted Value for login form errors validations
  error      : string    = '';           // Error Message Stored value
  returnUrl  : string;                   // Return url when user was not login
  public showPassword: boolean = false;  // password toggle for input feild


  constructor(private router: Router, private formBuilder: FormBuilder, private loginservice : LoginService, private route: ActivatedRoute) { }



  // @ViewChild('f') signin2: NgForm;


  // return login form controls for error handling
  get f() { return this.loginForm.controls;}

  //  On submit click, reset field value
  // onSubmit() {
  //     this.signin2.reset();
  // }
     /**
   * Form submit
   */
      onSubmit() {
        this.submitted = true;
        console.log(this.loginForm.value);
  
  
        // stop here if form is invalid
        if (this.loginForm.invalid) {
          console.log('form is not valid');
  
          return;
        } 

        else {
          this.loginservice.login(this.loginForm.value)
              .pipe(first())
              .subscribe(
                data => {
                  // this.router.navigate(['/dashboard/ecommerce-v1']);
                  this.router.navigate(['/housing/housinggraphs']);
                },
                error => {
                  this.error = error ? error : '';
                });
        }

      }
  
  
  // Toggle password for showing user
   public onPasswordToggle(): void {
     this.showPassword = !this.showPassword;
   }
    
  // On ResetPassword link click
  onResetpassword2() {
    this.router.navigate(['reset-password2'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup2() {
    this.router.navigate(['signup2'], { relativeTo: this.route.parent });
  }


  ngOnInit():void {
    document.body.classList.add('auth-body-bg')
    this.loginForm = this.formBuilder.group({
      usr_nm  : ['9876543210',  [Validators.required]],
      usr_pwd : ['123456',      [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

}

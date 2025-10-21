import { Component, inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { login } from 'src/app/store/Authentication/authentication.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { ToasterAlertService } from 'src/app/core/services/Toasteralert.Service';
import { LocalStorageService } from 'src/app/core/services/localStorage.service';
import { LoginService } from 'src/app/core/services/login.service';
import { Login_response } from 'src/app/core/models/login_respose.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  spinner = inject(NgxSpinnerService);
  loginForm: UntypedFormGroup;
  submitted: any = false;
  error: any = '';
   returnUrl: string = '/';
  fieldTextType!: boolean;

  // set the currenr year
  year: number = new Date().getFullYear();
 private translate = inject(TranslateService);

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private store: Store,
  
    public toastralert: ToasterAlertService,
    private loginservice: LoginService,
    public localStorageService: LocalStorageService,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    // form validation
    this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    const email = this.f['email'].value; // Get the username from the form
    const password = this.f['password'].value; // Get the password from the form

    // Login Api
    this.store.dispatch(login({ email: email, password: password }));
    this.spinner.hide();
  }

  /**
 * Password Hide/Show
 */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  LoginDetails: any;
  login_response: any;
  token: any;
  diablelogin: boolean = false;
  loginbtn = 'Log In';
  visible: boolean = false;
  changetype: boolean = true;
  Email: any;
  Password: any;
  btnClick: boolean = false;
  
   async Login() {
    this.diablelogin = true;
    this.loginbtn = 'Processing...';
    // this.LoginDetails.markAllAsTouched();
    // if (this.LoginDetails?.valid) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    if (this.Email == "" || this.Email == null || this.Email == undefined) {
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false;
    } else if (this.Password == "" || this.Password == null || this.Password == undefined) {
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false
    } else if (!emailPattern.test(this.Email) && !phonePattern.test(this.Email)) {
      this.toastralert.toastrerror('Wrong Credentials');
      this.loginbtn = 'Log In';
      this.diablelogin = false;
      this.btnClick = true;
      return false
    }
    else {
      let formData = {
        EmailOrPhoneNumber: this.Email,
        Password: this.Password
      }
      console.log(formData);
      this.loginservice.userAuthentication(formData).subscribe(
        (results) => {
          if (results) {
            console.log(results);
            this.diablelogin = false;
            this.btnClick = false;
            if (results.flag && results.token) {
              this.loginbtn = 'Authenticating...';
              let loginResponse: Login_response;
              loginResponse = results;
              loginResponse.accessToken = results.token;
              //Storing API response.
             
              this.localStorageService.saveData("star_token_response", JSON.stringify(loginResponse));
              // localStorage.setItem("sitebridge_token_response", JSON.stringify(results));
              this.loginservice.setloginuserdeatils(loginResponse);
              //Stroing Token Claims.
              const token_claims = this.loginservice.decodedToken();
              this.localStorageService.saveData("star_token_claims", JSON.stringify(token_claims));
              // localStorage.setItem("sitebridge_token_claims", JSON.stringify(token_claims));
              this.loginservice.setToken_Claims(token_claims);

             var new1 = this.localStorageService.getData("star_token_claims");
              this.localStorageService.getData("star_token_claims");
              console.log(new1);
            this.router.navigate(['/ecommerce/products']);
             
              
            } else {
              this.loginbtn = 'Log In';
              this.toastralert.toastrerror(results.message);
            }
          }
        },
        (err) => {
          this.diablelogin = false;
          this.loginbtn = 'Log In';
          this.btnClick = false
          this.toastralert.toastrerror(this.translate.instant('The_Email_or_Password_is_incorrect'));
        }
      );
    }
  }
}

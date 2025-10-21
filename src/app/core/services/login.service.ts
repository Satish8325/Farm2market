import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ToasterAlertService } from './Toasteralert.Service';
import { LocalStorageService } from './localStorage.service';
import { Token_Claims } from '../models/token_claims.model';
import { Login_response } from '../models/login_respose.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<Login_response | null>;
  public user: Observable<Login_response | null>;

  private token_ClaimsSubject: BehaviorSubject<Token_Claims | null>;
  public token_claimsdata: Observable<Token_Claims | null>;

  private http = inject(HttpClient);
  private router = inject(Router);
  private _cookiesService = inject(CookieService);
  private localStorageService = inject(LocalStorageService);
  private toastralert = inject(ToasterAlertService);
 
  constructor() { 
    const initialUser = this.localStorageService.getData('star_token_response');  // JSON.parse(localStorage.getItem('sitebridge_token_response') || 'null');
    this.userSubject = new BehaviorSubject<Login_response | null>(initialUser);
    this.user = this.userSubject.asObservable();

    const initialClaims = this.localStorageService.getData('star_token_response'); // JSON.parse(localStorage.getItem('sitebridge_token_claims') || 'null');
    this.token_ClaimsSubject = new BehaviorSubject<Token_Claims | null>(initialClaims);
    this.token_claimsdata = this.token_ClaimsSubject.asObservable();
  }

  public get getloginuserdeatils() {
      return this.userSubject.value;
  }

  setloginuserdeatils(userdetails :Login_response){
      this.userSubject.next(userdetails);
  }

  public get getToken_Claims(){
      return this.token_ClaimsSubject.value;
  }

  setToken_Claims(tokenClaims :Token_Claims){
      this.token_ClaimsSubject.next(tokenClaims);
  }

  getToken(){
    let tokenResponse = this.localStorageService.getData('star_token_response'); // JSON.parse(localStorage.getItem('sitebridge_token_response') || 'null');
   console.log(tokenResponse);
    return tokenResponse?.token || tokenResponse?.accessToken;
 }



logout() {
 this.localStorageService.removeData('star_token_response');
 this.localStorageService.removeData('star_token_claims');
 this._cookiesService.deleteAll();

 this.router.navigate(['/login']);
}

clearLocalStorage() {
this.localStorageService.removeData('star_token_response');
this.localStorageService.removeData('star_token_claims');
}

 //This method is used to decode the jwt token.
 decodedToken(){
     const jwtHelper = new JwtHelperService();
     const token = this.getToken()!;
     console.log(jwtHelper.decodeToken(token),"userdata")
     return jwtHelper.decodeToken(token)
 }

 
 userAuthentication(formData: any) {
  return this.http.post<any>(environment.login, formData).pipe(map((res: any) => {
    return res;
  }), catchError(error => {
    return throwError(error);
  }));
}
}

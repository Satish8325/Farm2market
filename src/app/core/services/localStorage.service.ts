import { Injectable, Injector } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor( private injector: Injector,public _cookiesService: CookieService, public router: Router) { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }
  someMethod() {
    const loginService = this.injector.get(LoginService);
    // Use loginService here
  }

  public getData(key: string) {
    let data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(this.decrypt(data)) || null;
      } catch (error) {
        return null;
      }
    }
    return null;
  }
  
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, environment.localStorageSecretKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, environment.localStorageSecretKey).toString(CryptoJS.enc.Utf8);
  }

}
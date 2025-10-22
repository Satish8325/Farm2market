import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Auth Services
import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
         public localStorageService: LocalStorageService,
        private authFackservice: AuthfakeauthenticationService
    ) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Use stored token or currentUser as an authentication indicator instead of calling login(email, password)
    const token = this.isLoggedIn();
    if (token) {
      return true;
    }


    this.router.navigate(['/login'], {
    });
    return false;
  }
    isLoggedIn(): boolean {
    const token = this.localStorageService.getData('star_token_response');
    return !!token;
  }
}

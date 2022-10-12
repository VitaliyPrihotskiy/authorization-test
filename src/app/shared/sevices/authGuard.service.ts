import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    return this.checkAccessRights();
  }

  canActivateChild(): boolean {
    return this.checkAccessRights();
  }

  checkAccessRights(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.setRedirectUrl(this.router.url);
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
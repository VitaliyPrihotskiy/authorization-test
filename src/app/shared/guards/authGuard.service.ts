import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthInfoService } from '../sevices/auth-info.service';

@Injectable({
providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authInfoService: AuthInfoService, private router: Router) { }

  canActivate(): boolean {
    return this.checkAccessRights();
  }

  canActivateChild(): boolean {
    return this.checkAccessRights();
  }

  checkAccessRights(): boolean {
    if (!this.authInfoService.isAuthenticated()) {
      this.authInfoService.setRedirectUrl(this.router.url);
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

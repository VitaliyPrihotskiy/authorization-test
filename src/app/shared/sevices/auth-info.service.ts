import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SuccessResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthInfoService {

  private redirectUrl: string | null = null;

  constructor(
    private readonly router: Router) { }

  get userData(): SuccessResponse | null {
    try {
      return JSON.parse(localStorage.getItem('userData') || '');
    }
    catch {
      return null;
    }
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public getAuthToken(): string | null {
    return this.userData?.token || null;
  }

  public setUserData(resp: SuccessResponse): void {
    localStorage.setItem('userData', JSON.stringify(resp));

    this.redirectAfterLogin();
  }

  public isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  private redirectAfterLogin(): void {
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
      return;
    }
    this.router.navigate(['main-page']);
  }
}

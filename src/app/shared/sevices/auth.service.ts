import { UserType } from './../constants/user-type.constant';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
 })
export class AuthService {
  private authenticated = false;
  private redirectUrl: string | null = null;
  token: string | null = null;

  constructor(private router: Router, public http: HttpClient) { }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public auth(options: {email: string, password: string, userType: UserType}): any {
    const body = {
      email: options.email,
      password: options.password
    }
    this.http.post(environment.api.login, body).subscribe((response)=>{console.log(response)
      if (response){

      } else {

      }
    });
    // if (login === 'foo' && password === 'bar') {
    //   this.authenticated = true;
    //   this.redirectUrl = this.redirectUrl === undefined ? '/' : this.redirectUrl;
    //   this.router.navigate([this.redirectUrl]);
    // }
    return null
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

}

import { environment } from './../../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Subject, takeUntil} from 'rxjs';
import { SuccessResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
 })
export class AuthService implements OnDestroy {
  private readonly ngUnsubscribe = new Subject<void>();

  private authenticated = false;
  private redirectUrl: string | null = null;
  userData: SuccessResponse | undefined;

  constructor(private router: Router, public http: HttpClient) { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  public auth(options: {email: string, password: string}): any {
      this.http.post<SuccessResponse | HttpErrorResponse>(environment.api.login, options)
      .pipe(takeUntil( this.ngUnsubscribe ))
        .subscribe(
          (response:any) => {
            this.authenticated = true;
            this.userData = response;
            this.redirectUrl = this.redirectUrl === null ? 'main-page' : this.redirectUrl;
            this.router.navigate([this.redirectUrl]);
            return { response: response }
          },
          (error:any) => {console.log(error)
            return { error: error }
          }
        );
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

}

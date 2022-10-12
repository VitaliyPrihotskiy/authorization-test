import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SuccessResponse } from '../models/response.model';
import { environment } from './../../../environments/environment';
import { AuthInfoService } from './auth-info.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly authInfoService: AuthInfoService,
    private readonly http: HttpClient) { }

  public auth(options: { email: string, password: string }): Observable<SuccessResponse | HttpErrorResponse> {
    return this.http.post<SuccessResponse>(environment.api.login, options)
      .pipe(
        tap((resp: SuccessResponse) => {
          this.authInfoService.setUserData(resp);
        }));
  }
}

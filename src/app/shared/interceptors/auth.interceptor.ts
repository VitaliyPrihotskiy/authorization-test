import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthInfoService } from "../sevices/auth-info.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(
        private readonly authInfoService: AuthInfoService,
        private readonly router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authInfoService.getAuthToken();

        if (token) {
            request = request.clone({
                setHeaders: { 'X-Token': `${token}` }
            });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                }
                return throwError(err);
            })
        )
    }
}

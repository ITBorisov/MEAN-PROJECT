import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../components/authentication/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 403) {
                // auto logout if 401 response returned from api
                this.auth.logout();
                // location.reload(true);
                  this.router.navigate(['/']);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

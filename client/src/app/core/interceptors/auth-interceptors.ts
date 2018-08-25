import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  import { AuthService } from '../../components/authentication/auth.service';

  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

      if (this.getAuthtoken() !== null) {
        req = req.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + this.getAuthtoken(),
            'Content-Type': 'application/json'
          }
        });
      }
      return next.handle(req);
    }

    private getAuthtoken(): string {
      return localStorage.getItem('token');
    }
  }

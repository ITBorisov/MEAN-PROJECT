import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';

  import { AuthService } from '../../components/authentication/auth.service';

  @Injectable()
  export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
      const isAdmin = this.authService.adminRole();

      if (!isAdmin) {
        this.router.navigate(['/']);
        return false;
      }
      return isAdmin;
    }
  }

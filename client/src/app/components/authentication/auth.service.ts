import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3001/api';
import { ToastrService } from 'ngx-toastr';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatus = new Subject<boolean>();
  private adminStatus = new Subject<boolean>();
  private userId: string;
  private isAdmin: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  createUser(data) {
    this.http.post<{success: boolean, message: string}>(BACKEND_URL + '/user/register', data).subscribe(response => {
      this.toastr.success(response.message);
      this.router.navigate(['/user/login']);
    }, error => {
      this.toastr.error(error.error.message);
    });
  }

  loginUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<{ token: string, userId: string, isAdmin: string }>(BACKEND_URL + '/user/login', authData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.isAdmin = response.isAdmin;

        if (this.isAdmin) {
          this.adminStatus.next(true);
        }

        this.authStatus.next(true);
        this.saveAuthData(token, this.userId, this.isAdmin);
        this.toastr.success('Successful sign in');
        this.router.navigate(['/']);
      }

    });
  }

  getUsers() {
    return this.http.get<{message: string, users: {}}>(BACKEND_URL + '/user/all');
  }

  deleteUser(id) {
    return this.http.delete<{success: boolean, message: string}>(BACKEND_URL + '/user/delete/' + id);
  }

  makeAdmin(id) {
    return this.http.put<{success: boolean, message: string}>(BACKEND_URL + '/user/makeAdmin/' + id, {});
  }

  getProfile() {
    return this.http.get<{profile: {}}>(BACKEND_URL + '/user/profile');
  }

  getPublicUserProfile(id) {
    return this.http.get(BACKEND_URL + '/user/public-profile/' + id);
  }

  sendMessage(message, username) {
    const data = {
      message: message,
      username: username
    };
    return this.http.post<{success: boolean, message: string}>(BACKEND_URL + '/user/messages', data);
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAdmin = null;
    this.isAuthenticated = false;

    this.authStatus.next(false);
    this.adminStatus.next(false);

    this.clearAuthData();
    this.toastr.success('Successful sign out');
    this.router.navigate(['/']);
  }

  adminRole(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.isAuthenticated = true;
    this.authStatus.next(true);

    if (authInformation.isAdmin === 'true') {
      this.adminStatus.next(true);
    }
}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  // live event - user is auth or not
  getAuthState() {
    return this.authStatus.asObservable();
  }

  getisAdminState() {
    return this.adminStatus.asObservable();
  }

  getUserId() {
    // return this.userId;
    return localStorage.getItem('userId');
  }

  private saveAuthData(token: string, userId: string, isAdmin: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', isAdmin);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId,
      isAdmin: isAdmin
    };
  }
}

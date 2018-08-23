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
  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  createUser(data) {
    this.http.post<{message: string}>(BACKEND_URL + '/user/register', data).subscribe(response => {
      console.log(response.message);
      this.toastr.success('Успешна регистрация');
      this.router.navigate(['/login']);
    });
  }

  loginUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<{ token: string, userId: string, isAdmin: boolean }>(BACKEND_URL + '/user/login', authData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatus.next(true);
        this.saveAuthData(token, this.userId);
        this.toastr.success('Успешен вход');
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

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this.clearAuthData();
    this.toastr.success('Успешен изход');
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.isAuthenticated = true;
    this.authStatus.next(true);
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

  getUserId() {
    // return this.userId;
    return localStorage.getItem('userId');
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (!token) {
      return;
    }
    return {
      token: token,
      userId: userId
    };
  }
}

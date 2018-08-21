import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3001/api';
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
    private router: Router) { }

  createUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };
    this.http.post<{message: string}>(BACKEND_URL + '/user/register', authData).subscribe(response => {
      console.log(response.message);
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
        this.router.navigate(['/']);
      }

    });
  }

  getProfile() {
    return this.http.get<{profile: {}}>(BACKEND_URL + '/user/profile');
  }

  logout() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this.clearAuthData();
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
    return this.userId;
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

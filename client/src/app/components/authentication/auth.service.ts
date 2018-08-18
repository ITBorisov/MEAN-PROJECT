import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3001/api';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatus = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };
    this.http.post<{message: string}>(BACKEND_URL + '/user/register', authData).subscribe(response => {
      console.log(response.message);
    });
  }

  loginUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post<{token: string}>(BACKEND_URL + '/user/login', authData).subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        this.isAuthenticated = true;
        this.authStatus.next(true);
      }

    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
  }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthState() {
    return this.authStatus.asObservable();
  }
}

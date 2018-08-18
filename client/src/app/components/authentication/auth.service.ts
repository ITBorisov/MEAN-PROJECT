import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const BACKEND_URL = 'http://localhost:3001/api';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };
    this.http.post(BACKEND_URL + '/user/register', authData).subscribe(response => {
      console.log(response);
    });
  }

  loginUser(username: string, password: string) {
    const authData: AuthData = {
      username: username,
      password: password
    };

    this.http.post(BACKEND_URL + '/user/login', authData).subscribe(response => {
      console.log(response);
    });
  }
}

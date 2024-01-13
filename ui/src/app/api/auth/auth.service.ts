import { Injectable } from '@angular/core';
import { LoginInput } from './login.input';
import { LoginOutput } from './login.output';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginInput: LoginInput) {
    return this.http.post<LoginOutput>('/api/auth/login', loginInput);
  }
}

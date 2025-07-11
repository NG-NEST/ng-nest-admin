import { inject, Injectable } from '@angular/core';
import { LoginInput } from './login.input';
import { Auth } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../user';
import { RefreshTokenInput } from './refresh-token.input';
import { VerifyTokenInput } from './verify-token.input';
import { VerifyTokenOutput } from './verify-token.output';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  userInfo(): Observable<User> {
    return this.apollo
      .query<{ userInfo: User }>({
        query: gql`
          query UserInfo {
            userInfo {
              account
              email
              id
              name
              phone
              roles {
                role {
                  id
                  name
                  permissions {
                    permission {
                      name
                      code
                    }
                  }
                }
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.userInfo));
  }

  captcha(codekey: string) {
    return this.http.get('/api/auth/captcha', { headers: { codekey }, responseType: 'text' });
  }

  login(input: LoginInput, headers: { [key: string]: any }) {
    return this.http.post<Auth>('/api/auth/login', input, { headers });
  }

  logout() {
    return this.http.post('/api/auth/logout', {});
  }

  refreshToken(input: RefreshTokenInput) {
    return this.http.post<Auth>('/api/auth/refresh-token', input);
  }

  verifyToken(input: VerifyTokenInput) {
    return this.http.post<VerifyTokenOutput>('/api/auth/verify-token', input);
  }
}

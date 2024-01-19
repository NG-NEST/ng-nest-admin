import { Injectable } from '@angular/core';
import { LoginInput } from './login.input';
import { LoginOutput } from './login.output';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { User } from '../user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

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
                }
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.userInfo));
  }

  login(loginInput: LoginInput) {
    return this.http.post<LoginOutput>('/api/auth/login', loginInput);
  }
}

import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { LoginInput } from './login.input';
import { LoginOutput } from './login.output';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(loginInput: LoginInput): Observable<LoginOutput> {
    return this.apollo
      .mutate<{ login: LoginOutput }>({
        variables: { loginInput },
        mutation: gql`
          mutation Login($loginInput: LoginInput!) {
            login(login: $loginInput) {
              accessToken
              refreshToken
            }
          }
        `
      })
      .pipe(map((x) => x.data?.login!));
  }
}

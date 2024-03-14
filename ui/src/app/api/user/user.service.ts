import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { User } from './user.model';
import { UserPaginationInput } from './pagination.input';
import { UserCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { UserMessage } from './user.enum';
import { UserUpdateInput } from './update.input';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordInput } from './reset-password.input';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  user(id: string): Observable<User> {
    return this.apollo
      .query<{ user: User }>({
        variables: { id },
        query: gql`
          query User($id: ID!) {
            user(id: $id) {
              account
              email
              id
              name
              phone
              roles {
                roleId
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.user)));
  }

  users(input: UserPaginationInput): Observable<BasePagination<User>> {
    return this.apollo
      .query<{ users: BasePagination<User> }>({
        variables: input,
        query: gql`
          query Users($skip: Int, $take: Int, $where: UserWhereInput, $orderBy: [UserOrderInput!]) {
            users(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                account
                createdAt
                email
                id
                name
                phone
                updatedAt
                roles {
                  role {
                    id
                    name
                  }
                }
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.users!)));
  }

  create(input: UserCreateInput): Observable<string> {
    return this.http.post('/api/user', input).pipe(map(() => UserMessage.CreatedSuccess));
  }

  update(input: UserUpdateInput): Observable<string> {
    return this.http.patch('/api/user', input).pipe(map(() => UserMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/user/${id}`).pipe(map(() => UserMessage.DeletedSuccess));
  }

  resetPassword(id: string, resetPassword: ResetPasswordInput): Observable<string> {
    return this.http
      .put(`/api/user/${id}/reset-password`, resetPassword)
      .pipe(map(() => UserMessage.PasswordResetSuccess));
  }
}

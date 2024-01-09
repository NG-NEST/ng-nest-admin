import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { User } from './user.model';
import { UserPaginationInput } from './user-pagination.input';
import { CreateUserInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { UserMessage } from './user.enum';
import { UpdateUserInput } from './update.input';
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
          query data($id: ID!) {
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
          query data($skip: Int, $take: Int, $where: UserWhereInput, $orderBy: [UserOrderInput!]) {
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

  createUser(createUser: CreateUserInput): Observable<string> {
    return this.http.post('/api/user', createUser).pipe(map(() => UserMessage.CreatedSuccess));
  }

  updateUser(updateUser: UpdateUserInput): Observable<string> {
    return this.http.put('/api/user', updateUser).pipe(map(() => UserMessage.UpdatedSuccess));
  }

  deleteUser(id: string): Observable<string> {
    return this.http.delete(`/api/user/${id}`).pipe(map(() => UserMessage.DeletedSuccess));
  }

  resetPassword(id: string, resetPassword: ResetPasswordInput): Observable<string> {
    return this.http.put(`/api/user/${id}/reset-password`, resetPassword).pipe(map(() => UserMessage.PasswordResetSuccess));
  }
}

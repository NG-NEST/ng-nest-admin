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

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apollo: Apollo) {}

  user(id: string): Observable<User> {
    return this.apollo
      .watchQuery<{ user: User }>({
        variables: { id },
        query: gql`
          query data($id: ID!) {
            user(id: $id) {
              account
              email
              id
              name
              phone
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => x.data?.user));
  }

  users(input: UserPaginationInput): Observable<BasePagination<User>> {
    return this.apollo
      .watchQuery<{ users: BasePagination<User> }>({
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
              }
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => cloneDeep(x.data?.users!)));
  }

  createUser(createUser: CreateUserInput): Observable<string> {
    return this.apollo
      .mutate<{ user: User }>({
        variables: { createUser },
        mutation: gql`
          mutation data($createUser: CreateUserInput!) {
            createUser(user: $createUser) {
              id
            }
          }
        `
      })
      .pipe(map(() => UserMessage.CreatedSuccess));
  }

  updateUser(id: string, updateUser: UpdateUserInput): Observable<string> {
    return this.apollo
      .mutate<{ role: User }>({
        variables: { id, updateUser },
        mutation: gql`
          mutation data($id: ID!, $updateUser: UpdateUserInput!) {
            updateUser(id: $id, role: $updateUser) {
              id
            }
          }
        `
      })
      .pipe(map(() => UserMessage.UpdatedSuccess));
  }

  deleteUser(id: string): Observable<string> {
    return this.apollo
      .mutate<{ role: User }>({
        variables: { id },
        mutation: gql`
          mutation data($id: ID!) {
            deleteUser(id: $id) {
              id
            }
          }
        `
      })
      .pipe(map(() => UserMessage.DeletedSuccess));
  }
}

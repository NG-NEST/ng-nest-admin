import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { User } from './user.model';
import { UserPaginationInput } from './user-pagination.input';
import { CreateUserInput } from './create.input';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apollo: Apollo) {}

  user(id: string): Observable<User> {
    return this.apollo
      .watchQuery<{ user: User }>({
        fetchPolicy: 'network-only',
        variables: { id },
        query: gql`
          query data($id: ID!) {
            user(id: $id) {
              account
              createdAt
              email
              id
              name
              phone
              updatedAt
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => x.data?.user));
  }

  users(input: UserPaginationInput): Observable<BasePagination<User>> {
    return this.apollo
      .watchQuery<{ users: BasePagination<User> }>({
        fetchPolicy: 'network-only',
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

  createUser(createUser: CreateUserInput): Observable<User> {
    return this.apollo
      .mutate<{ user: User }>({
        variables: { createUser },
        mutation: gql`
          mutation data($createUser: CreateUserInput!) {
            createUser(createUser: $createUser) {
              account
              createdAt
              id
              name
              phone
              updatedAt
            }
          }
        `
      })
      .pipe(map((x) => x.data?.user!));
  }
}

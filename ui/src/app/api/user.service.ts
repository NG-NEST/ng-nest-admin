import { Injectable } from '@angular/core';
import { BaseModel, BaseOrder, BasePaginationInput, BasePaginationOutput, BaseWhere, SortOrder } from '@ui/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

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

  users(input: UserPaginationInput): Observable<BasePaginationOutput<User>> {
    return this.apollo
      .watchQuery<{ users: BasePaginationOutput<User> }>({
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
      .valueChanges.pipe(map((x) => x.data?.users!));
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

export interface User extends BaseModel {
  name?: string;
  account?: string;
  email?: string;
  phone?: string;
}

export interface CreateUserInput {
  name: string;
  account: string;
  password: string;
  email: string;
  phone?: string;
}

export interface UserOrderInput extends BaseOrder {
  name?: SortOrder;
  account?: SortOrder;
  email?: SortOrder;
  phone?: SortOrder;
}

export interface UserWhere {
  name?: string;
  account?: string;
  email?: string;
  phone?: string;
}

export interface UserWhereInput extends BaseWhere<UserWhere> {}

export interface UserPaginationInput extends BasePaginationInput<UserOrderInput, UserWhereInput> {}

import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Role } from './role.model';
import { RolePaginationInput } from './role-pagination.input';
import { CreateRoleInput } from './create.input';
import { cloneDeep } from 'lodash-es';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private apollo: Apollo) {}

  role(id: string): Observable<Role> {
    return this.apollo
      .watchQuery<{ role: Role }>({
        variables: { id },
        query: gql`
          query data($id: ID!) {
            role(id: $id) {
              createdAt
              description
              id
              name
              updatedAt
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => x.data?.role));
  }

  roles(input: RolePaginationInput): Observable<BasePagination<Role>> {
    return this.apollo
      .watchQuery<{ roles: BasePagination<Role> }>({
        variables: input,
        query: gql`
          query data($skip: Int, $take: Int, $where: RoleWhereInput, $orderBy: [RoleOrderInput!]) {
            roles(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                createdAt
                description
                id
                name
                updatedAt
              }
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => cloneDeep(x.data?.roles!)));
  }

  createRole(createRole: CreateRoleInput): Observable<Role> {
    return this.apollo
      .mutate<{ role: Role }>({
        variables: { createRole },
        mutation: gql`
          mutation data($createRole: CreateRoleInput!) {
            createRole(createRole: $createRole) {
              description
              name
            }
          }
        `
      })
      .pipe(map((x) => x.data?.role!));
  }
}

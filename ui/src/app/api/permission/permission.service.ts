import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Permission } from './permission.model';
import { PermissionPaginationInput } from './pagination.input';
import { PermissionCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { PermissionMessage } from './permission.enum';
import { PermissionUpdateInput } from './update.input';
import { PermissionSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { PermissionSelectInput } from './select.input';
import { PermessionSaveManyInput } from './save-many.input';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  permission(id: string): Observable<Permission> {
    return this.apollo
      .query<{ permission: Permission }>({
        variables: { id },
        query: gql`
          query permission($id: ID!) {
            permission(id: $id) {
              id
              name
              code
              sort
              description
            }
          }
        `
      })
      .pipe(map((x) => x.data?.permission));
  }

  permissions(input: PermissionPaginationInput): Observable<BasePagination<Permission>> {
    return this.apollo
      .query<{ permissions: BasePagination<Permission> }>({
        variables: input,
        query: gql`
          query Permissions(
            $skip: Int
            $take: Int
            $where: PermissionWhereInput
            $orderBy: [PermissionOrderInput!]
          ) {
            permissions(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                name
                code
                sort
                description
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.permissions!)));
  }

  permissionSelect(input: PermissionSelectInput): Observable<PermissionSelectOutput[]> {
    return this.apollo
      .query<{ permissionSelect: PermissionSelectOutput[] }>({
        variables: input,
        query: gql`
          query PermissionSelect($where: PermissionWhereInput, $orderBy: [PermissionOrderInput!]) {
            permissionSelect(where: $where, orderBy: $orderBy) {
              id
              name
              code
              sort
              description
              resourceId
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.permissionSelect!)));
  }

  create(input: PermissionCreateInput): Observable<string> {
    return this.http
      .post('/api/permission', input)
      .pipe(map(() => PermissionMessage.CreatedSuccess));
  }

  update(input: PermissionUpdateInput): Observable<string> {
    return this.http
      .patch(`/api/permission`, input)
      .pipe(map(() => PermissionMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/permission/${id}`)
      .pipe(map(() => PermissionMessage.DeletedSuccess));
  }

  saveMany(input: PermessionSaveManyInput): Observable<string> {
    return this.http
      .post(`/api/permission/many`, input)
      .pipe(map(() => PermissionMessage.UpdatedSuccess));
  }
}

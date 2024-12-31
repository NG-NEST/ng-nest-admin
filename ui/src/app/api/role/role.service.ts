import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Role } from './role.model';
import { RolePaginationInput } from './pagination.input';
import { RoleCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { RoleMessage } from './role.enum';
import { RoleUpdateInput } from './update.input';
import { RoleSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { RoleSelectInput } from './select.input';
import { Permission } from '../permission';
import { RolePermissionOutput } from './role-permissions.output';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  role(id: string): Observable<Role> {
    return this.apollo
      .query<{ role: Role }>({
        variables: { id },
        query: gql`
          query Role($id: ID!) {
            role(id: $id) {
              id
              description
              name
            }
          }
        `
      })
      .pipe(map((x) => x.data?.role));
  }

  roles(input: RolePaginationInput): Observable<BasePagination<Role>> {
    return this.apollo
      .query<{ roles: BasePagination<Role> }>({
        variables: input,
        query: gql`
          query Roles($skip: Int, $take: Int, $where: RoleWhereInput, $orderBy: [RoleOrderInput!]) {
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
      .pipe(map((x) => cloneDeep(x.data?.roles!)));
  }

  roleSelect(input: RoleSelectInput): Observable<RoleSelectOutput[]> {
    return this.apollo
      .query<{ roleSelect: RoleSelectOutput[] }>({
        variables: input,
        query: gql`
          query RoleSelect($where: RoleWhereInput, $orderBy: [RoleOrderInput!]) {
            roleSelect(where: $where, orderBy: $orderBy) {
              id
              name
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.roleSelect!)));
  }

  rolePermissions(id: string, subjectId: string): Observable<RolePermissionOutput[]> {
    return this.apollo
      .query<{ rolePermissions: Permission[] }>({
        variables: { id, subjectId },
        query: gql`
          query RolePermissions($id: ID!, $subjectId: ID!) {
            rolePermissions(id: $id, subjectId: $subjectId) {
              id
              code
              name
              resourceId
            }
          }
        `
      })
      .pipe(map((x) => x.data?.rolePermissions));
  }

  create(input: RoleCreateInput): Observable<string> {
    return this.http.post('/api/role', input).pipe(map(() => RoleMessage.CreatedSuccess));
  }

  update(input: RoleUpdateInput): Observable<string> {
    return this.http.patch(`/api/role`, input).pipe(map(() => RoleMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/role/${id}`).pipe(map(() => RoleMessage.DeletedSuccess));
  }

  updatePermissions(id: string, permissionIds: string[]) {
    return this.http
      .post(`/api/role/${id}/permissions`, permissionIds)
      .pipe(map(() => RoleMessage.UpdatedPermissionsSuccess));
  }
}

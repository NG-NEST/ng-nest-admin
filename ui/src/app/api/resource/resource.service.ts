import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Resource } from './resource.model';
import { ResourcePaginationInput } from './pagination.input';
import { ResourceCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { ResourceMessage } from './resource.enum';
import { ResourceUpdateInput } from './update.input';
import { ResourceSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { ResourceSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class ResourceService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  resource(id: string): Observable<Resource> {
    return this.apollo
      .query<{ resource: Resource }>({
        variables: { id },
        query: gql`
          query resource($id: ID!) {
            resource(id: $id) {
              name
              code
              sort
              description
              id
              pid
              subjectId
            }
          }
        `
      })
      .pipe(map((x) => x.data?.resource));
  }

  resources(input: ResourcePaginationInput): Observable<BasePagination<Resource>> {
    return this.apollo
      .query<{ resources: BasePagination<Resource> }>({
        variables: input,
        query: gql`
          query Resources(
            $skip: Int
            $take: Int
            $where: ResourceWhereInput
            $orderBy: [ResourceOrderInput!]
          ) {
            resources(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                name
                code
                sort
                id
                subject {
                  name
                }
                parent {
                  name
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.resources!)));
  }

  resourceSelect(input: ResourceSelectInput): Observable<ResourceSelectOutput[]> {
    return this.apollo
      .query<{ resourceSelect: ResourceSelectOutput[] }>({
        variables: input,
        query: gql`
          query ResourceSelect($where: ResourceWhereInput, $orderBy: [ResourceOrderInput!]) {
            resourceSelect(where: $where, orderBy: $orderBy) {
              pid
              id
              name
              code
              permissions {
                code
                id
                name
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.resourceSelect!)));
  }

  create(input: ResourceCreateInput): Observable<string> {
    return this.http.post('/api/resource', input).pipe(map(() => ResourceMessage.CreatedSuccess));
  }

  update(input: ResourceUpdateInput): Observable<string> {
    return this.http.patch(`/api/resource`, input).pipe(map(() => ResourceMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/resource/${id}`).pipe(map(() => ResourceMessage.DeletedSuccess));
  }
}

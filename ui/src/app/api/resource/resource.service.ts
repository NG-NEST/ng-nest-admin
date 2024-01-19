import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Resource } from './resource.model';
import { ResourcePaginationInput } from './resource-pagination.input';
import { CreateResourceInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { ResourceMessage } from './resource.enum';
import { UpdateResourceInput } from './update.input';
import { ResourceSelect } from './resource-select.output';
import { HttpClient } from '@angular/common/http';

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

  resourceSelect(subjectId: string): Observable<ResourceSelect[]> {
    return this.apollo
      .query<{ resourceSelect: ResourceSelect[] }>({
        variables: { subjectId },
        query: gql`
          query ResourceSelect($subjectId: ID!) {
            resourceSelect(subjectId: $subjectId) {
              pid
              id
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.resourceSelect!)));
  }

  createResource(createResource: CreateResourceInput): Observable<string> {
    return this.http
      .post('/api/resource', createResource)
      .pipe(map(() => ResourceMessage.CreatedSuccess));
  }

  updateResource(updateResource: UpdateResourceInput): Observable<string> {
    return this.http
      .put(`/api/resource`, updateResource)
      .pipe(map(() => ResourceMessage.UpdatedSuccess));
  }

  deleteResource(id: string): Observable<string> {
    return this.http.delete(`/api/resource/${id}`).pipe(map(() => ResourceMessage.DeletedSuccess));
  }
}

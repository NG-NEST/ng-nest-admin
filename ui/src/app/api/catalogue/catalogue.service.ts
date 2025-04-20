import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Catalogue } from './catalogue.model';
import { CataloguePaginationInput } from './pagination.input';
import { CatalogueCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { CatalogueMessage } from './catalogue.enum';
import { CatalogueUpdateInput } from './update.input';
import { CatalogueSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { CatalogueSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  catalogue(id: string): Observable<Catalogue> {
    return this.apollo
      .query<{ catalogue: Catalogue }>({
        variables: { id },
        query: gql`
          query catalogue($id: ID!) {
            catalogue(id: $id) {
              name
              type
              sort
              description
              id
              pid
              resourceId
            }
          }
        `
      })
      .pipe(map((x) => x.data?.catalogue));
  }

  catalogues(input: CataloguePaginationInput): Observable<BasePagination<Catalogue>> {
    return this.apollo
      .query<{ catalogues: BasePagination<Catalogue> }>({
        variables: input,
        query: gql`
          query Catalogues(
            $skip: Int
            $take: Int
            $where: CatalogueWhereInput
            $orderBy: [CatalogueOrderInput!]
          ) {
            catalogues(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                name
                type
                sort
                id
                resource {
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
      .pipe(map((x) => cloneDeep(x.data?.catalogues!)));
  }

  catalogueSelect(input: CatalogueSelectInput): Observable<CatalogueSelectOutput[]> {
    return this.apollo
      .query<{ catalogueSelect: CatalogueSelectOutput[] }>({
        variables: input,
        query: gql`
          query CatalogueSelect($where: CatalogueWhereInput, $orderBy: [CatalogueOrderInput!]) {
            catalogueSelect(where: $where, orderBy: $orderBy) {
              pid
              id
              name
              type
              sort
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.catalogueSelect!)));
  }

  create(input: CatalogueCreateInput): Observable<string> {
    return this.http.post('/api/catalogue', input).pipe(map(() => CatalogueMessage.CreatedSuccess));
  }

  update(input: CatalogueUpdateInput): Observable<string> {
    return this.http
      .patch(`/api/catalogue`, input)
      .pipe(map(() => CatalogueMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/catalogue/${id}`)
      .pipe(map(() => CatalogueMessage.DeletedSuccess));
  }
}

import { inject, Injectable } from '@angular/core';
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
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CatalogueSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  catalogue(id: string): Observable<Catalogue> {
    return this.apollo
      .query<{ catalogue: Catalogue }>({
        variables: { id },
        query: gql`
          query catalogue($id: ID!) {
            catalogue(id: $id) {
              name
              url
              type
              sort
              many
              description
              id
              pid
              resourceId
              variableId
              parent {
                name
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.catalogue));
  }

  catalogueContent(id: string): Observable<string> {
    return this.apollo
      .query<{ catalogue: Catalogue }>({
        variables: { id },
        query: gql`
          query catalogue($id: ID!) {
            catalogue(id: $id) {
              content
              id
            }
          }
        `
      })
      .pipe(map((x) => x.data?.catalogue.content!));
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
                url
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
              many
              url
              type
              sort
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.catalogueSelect!)));
  }

  create(input: CatalogueCreateInput): Observable<Catalogue> {
    return this.http.post<Catalogue>('/api/catalogue', input);
  }

  update(input: CatalogueUpdateInput): Observable<Catalogue> {
    return this.http.patch<Catalogue>(`/api/catalogue`, input);
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/catalogue/${id}`)
      .pipe(map(() => CatalogueMessage.DeletedSuccess));
  }

  preview(id: string, params?: { schemaDataIds?: string[] }): Observable<Catalogue | Catalogue[]> {
    return this.http.get<Catalogue | Catalogue[]>(`/api/catalogue/preview/${id}`, { params });
  }

  download(
    id: string,
    params?: { schemaDataIds?: string[] }
  ): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.get(`/api/catalogue/download/${id}`, {
      params,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }

  folderUpload(body: FormData): Observable<string> {
    return this.http
      .post(`/api/catalogue/folder-upload`, body, { responseType: 'arraybuffer' })
      .pipe(map(() => CatalogueMessage.FolderUploadSuccess));
  }

  categoryPreview(
    resourceId: string,
    params?: { schemaDataIds?: string[] }
  ): Observable<Catalogue[]> {
    return this.http.get<Catalogue[]>(`/api/catalogue/category-preview/${resourceId}`, { params });
  }

  categoryDownload(
    resourceId: string,
    params?: { schemaDataIds?: string[] }
  ): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.get(`/api/catalogue/category-download/${resourceId}`, {
      params,
      responseType: 'arraybuffer',
      observe: 'response'
    });
  }
}

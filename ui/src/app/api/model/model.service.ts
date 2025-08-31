import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Model } from './model.model';
import { ModelPaginationInput } from './pagination.input';
import { ModelCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { ModelMessage } from './model.enum';
import { ModelUpdateInput } from './update.input';
import { ModelSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { ModelSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class ModelService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  model(id: string): Observable<Model> {
    return this.apollo
      .query<{ model: Model }>({
        models: { id },
        query: gql`
          query model($id: ID!) {
            model(id: $id) {
              name
              type
              description
            }
          }
        `
      })
      .pipe(map((x) => x.data?.model));
  }

  models(input: ModelPaginationInput): Observable<BasePagination<Model>> {
    return this.apollo
      .query<{ models: BasePagination<Model> }>({
        models: input,
        query: gql`
          query models(
            $skip: Int
            $take: Int
            $where: ModelWhereInput
            $orderBy: [ModelOrderInput!]
          ) {
            models(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                name
                type
                description
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.models!)));
  }

  modelSelect(input: ModelSelectInput): Observable<ModelSelectOutput[]> {
    return this.apollo
      .query<{ modelSelect: ModelSelectOutput[] }>({
        models: input,
        query: gql`
          query ModelSelect($where: ModelWhereInput, $orderBy: [ModelOrderInput!]) {
            modelSelect(where: $where, orderBy: $orderBy) {
              name
              type
              description
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.modelSelect!)));
  }

  create(input: ModelCreateInput): Observable<Model> {
    return this.http.post<Model>('/api/model', input);
  }

  update(input: ModelUpdateInput): Observable<Model> {
    return this.http.patch<Model>(`/api/model`, input);
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/model/${id}`).pipe(map(() => ModelMessage.DeletedSuccess));
  }
}

import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { VariableCategory } from './variable-category.model';
import { VariableCategoryPaginationInput } from './pagination.input';
import { VariableCategoryCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { VariableCategoryMessage } from './variable-category.enum';
import { VariableCategoryUpdateInput } from './update.input';
import { VariableCategorySelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { VariableCategorySelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class VariableCategoryService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  variableCategory(id: string): Observable<VariableCategory> {
    return this.apollo
      .query<{ variableCategory: VariableCategory }>({
        variables: { id },
        query: gql`
          query variableCategory($id: ID!) {
            variableCategory(id: $id) {
              id
              name
              code
              description
              resourceId
              resource {
                name
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.variableCategory));
  }

  variableCategorys(
    input: VariableCategoryPaginationInput
  ): Observable<BasePagination<VariableCategory>> {
    return this.apollo
      .query<{ variableCategorys: BasePagination<VariableCategory> }>({
        variables: input,
        query: gql`
          query VariableCategorys(
            $skip: Int
            $take: Int
            $where: VariableCategoryWhereInput
            $orderBy: [VariableCategoryOrderInput!]
          ) {
            variableCategorys(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                code
                name
                description
                id
                resource {
                  name
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.variableCategorys!)));
  }

  variableCategorySelect(
    input: VariableCategorySelectInput
  ): Observable<VariableCategorySelectOutput[]> {
    return this.apollo
      .query<{ variableCategorySelect: VariableCategorySelectOutput[] }>({
        variables: input,
        query: gql`
          query VariableCategorySelect(
            $where: VariableCategoryWhereInput
            $orderBy: [VariableCategoryOrderInput!]
          ) {
            variableCategorySelect(where: $where, orderBy: $orderBy) {
              id
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.variableCategorySelect!)));
  }

  create(input: VariableCategoryCreateInput): Observable<VariableCategory> {
    return this.http.post<VariableCategory>('/api/variable-category', input);
  }

  update(input: VariableCategoryUpdateInput): Observable<VariableCategory> {
    return this.http.patch<VariableCategory>(`/api/variable-category`, input);
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/variable-category/${id}`)
      .pipe(map(() => VariableCategoryMessage.DeletedSuccess));
  }
}

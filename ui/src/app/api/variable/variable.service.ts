import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Variable } from './variable.model';
import { VariablePaginationInput } from './pagination.input';
import { VariableCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { VariableMessage } from './variable.enum';
import { VariableUpdateInput } from './update.input';
import { VariableSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { VariableSelectInput } from './select.input';
import { VariableSaveManyInput } from './save-many.input';
import { VariableTypeInput } from './variable-type.input';

@Injectable({ providedIn: 'root' })
export class VariableService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  variable(id: string): Observable<Variable> {
    return this.apollo
      .query<{ variable: Variable }>({
        variables: { id },
        query: gql`
          query variable($id: ID!) {
            variable(id: $id) {
              id
              code
              type
              value
              source
              sort
              description
              resourceId
              variableCategoryId
            }
          }
        `
      })
      .pipe(map((x) => x.data?.variable));
  }

  variables(input: VariablePaginationInput): Observable<BasePagination<Variable>> {
    return this.apollo
      .query<{ variables: BasePagination<Variable> }>({
        variables: input,
        query: gql`
          query Variables(
            $skip: Int
            $take: Int
            $where: VariableWhereInput
            $orderBy: [VariableOrderInput!]
          ) {
            variables(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                code
                type
                value
                source
                sort
                description
                id
                resource {
                  name
                }
                variableCategory {
                  name
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.variables!)));
  }

  variableSelect(input: VariableSelectInput): Observable<VariableSelectOutput[]> {
    return this.apollo
      .query<{ variableSelect: VariableSelectOutput[] }>({
        variables: input,
        query: gql`
          query VariableSelect($where: VariableWhereInput, $orderBy: [VariableOrderInput!]) {
            variableSelect(where: $where, orderBy: $orderBy) {
              id
              code
              type
              value
              source
              sort
              description
              resourceId
              variableCategoryId
              variableCategory {
                name
                code
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.variableSelect!)));
  }

  create(input: VariableCreateInput): Observable<Variable> {
    return this.http.post<Variable>('/api/variable', input);
  }

  update(input: VariableUpdateInput): Observable<Variable> {
    return this.http.patch<Variable>(`/api/variable`, input);
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/variable/${id}`).pipe(map(() => VariableMessage.DeletedSuccess));
  }

  saveMany(input: VariableSaveManyInput): Observable<string> {
    return this.http
      .post(`/api/variable/many`, input)
      .pipe(map(() => VariableMessage.UpdatedSuccess));
  }

  typeVariables(params: VariableTypeInput): Observable<Variable[]> {
    return this.http.get<Variable[]>(`/api/variable/type`, { params: { ...params } });
  }
}

import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { SchemaData } from './schema-data.model';
import { SchemaDataPaginationInput } from './pagination.input';
import { SchemaDataCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { SchemaDataMessage } from './schema-data.enum';
import { SchemaDataUpdateInput } from './update.input';
import { SchemaDataSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { SchemaDataSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class SchemaDataService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  schemaData(id: string): Observable<SchemaData> {
    return this.apollo
      .query<{ schemaData: SchemaData }>({
        variables: { id },
        query: gql`
          query schemaData($id: ID!) {
            schemaData(id: $id) {
              id
              data
              schemaId
            }
          }
        `
      })
      .pipe(map((x) => x.data?.schemaData));
  }

  schemaDatas(input: SchemaDataPaginationInput): Observable<BasePagination<SchemaData>> {
    return this.apollo
      .query<{ schemaDatas: BasePagination<SchemaData> }>({
        variables: input,
        query: gql`
          query SchemaDatas(
            $skip: Int
            $take: Int
            $where: SchemaDataWhereInput
            $orderBy: [SchemaDataOrderInput!]
          ) {
            schemaDatas(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                data
                schemaId
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.schemaDatas!)));
  }

  schemaDataSelect(input: SchemaDataSelectInput): Observable<SchemaDataSelectOutput[]> {
    return this.apollo
      .query<{ schemaDataSelect: SchemaDataSelectOutput[] }>({
        variables: input,
        query: gql`
          query SchemaDataSelect($where: SchemaDataWhereInput, $orderBy: [SchemaDataOrderInput!]) {
            schemaDataSelect(where: $where, orderBy: $orderBy) {
              id
              data
              schemaId
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.schemaDataSelect!)));
  }

  create(input: SchemaDataCreateInput): Observable<string> {
    return this.http
      .post('/api/schema-data', input)
      .pipe(map(() => SchemaDataMessage.CreatedSuccess));
  }

  update(input: SchemaDataUpdateInput): Observable<string> {
    return this.http
      .patch(`/api/schema-data`, input)
      .pipe(map(() => SchemaDataMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/schema-data/${id}`)
      .pipe(map(() => SchemaDataMessage.DeletedSuccess));
  }
}

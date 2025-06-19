import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Schema } from './schema.model';
import { SchemaPaginationInput } from './pagination.input';
import { SchemaCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { SchemaMessage } from './schema.enum';
import { SchemaUpdateInput } from './update.input';
import { SchemaSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { SchemaSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class SchemaService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  schema(id: string): Observable<Schema> {
    return this.apollo
      .query<{ schema: Schema }>({
        variables: { id },
        query: gql`
          query schema($id: ID!) {
            schema(id: $id) {
              id
              name
              code
              json
            }
          }
        `
      })
      .pipe(map((x) => x.data?.schema));
  }

  schemas(input: SchemaPaginationInput): Observable<BasePagination<Schema>> {
    return this.apollo
      .query<{ schemas: BasePagination<Schema> }>({
        variables: input,
        query: gql`
          query Schemas(
            $skip: Int
            $take: Int
            $where: SchemaWhereInput
            $orderBy: [SchemaOrderInput!]
          ) {
            schemas(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                name
                code
                json
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.schemas!)));
  }

  schemaSelect(input: SchemaSelectInput): Observable<SchemaSelectOutput[]> {
    return this.apollo
      .query<{ schemaSelect: SchemaSelectOutput[] }>({
        variables: input,
        query: gql`
          query SchemaSelect($where: SchemaWhereInput, $orderBy: [SchemaOrderInput!]) {
            schemaSelect(where: $where, orderBy: $orderBy) {
              id
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.schemaSelect!)));
  }

  create(input: SchemaCreateInput): Observable<string> {
    return this.http.post('/api/schema', input).pipe(map(() => SchemaMessage.CreatedSuccess));
  }

  update(input: SchemaUpdateInput): Observable<string> {
    return this.http.patch(`/api/schema`, input).pipe(map(() => SchemaMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/schema/${id}`).pipe(map(() => SchemaMessage.DeletedSuccess));
  }
}

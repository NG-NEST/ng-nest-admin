import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Dictionary } from './dictionary.model';
import { DictionaryPaginationInput } from './pagination.input';
import { DictionaryCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { DictionaryMessage } from './dictionary.enum';
import { DictionaryUpdateInput } from './update.input';
import { DictionarySelect } from './select.output';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  dictionary(id: string): Observable<Dictionary> {
    return this.apollo
      .query<{ dictionary: Dictionary }>({
        variables: { id },
        query: gql`
          query dictionary($id: ID!) {
            dictionary(id: $id) {
              name
              code
              sort
              description
              id
              pid
              children {
                id
                name
                code
                sort
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.dictionary));
  }

  dictionaries(input: DictionaryPaginationInput): Observable<BasePagination<Dictionary>> {
    return this.apollo
      .query<{ dictionarys: BasePagination<Dictionary> }>({
        variables: input,
        query: gql`
          query Dictionarys(
            $skip: Int
            $take: Int
            $where: DictionaryWhereInput
            $orderBy: [DictionaryOrderInput!]
          ) {
            dictionarys(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                name
                code
                sort
                id
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
      .pipe(map((x) => cloneDeep(x.data?.dictionarys!)));
  }

  dictionarySelect(pid: string): Observable<DictionarySelect[]> {
    return this.apollo
      .query<{ dictionarySelect: DictionarySelect[] }>({
        variables: { pid },
        query: gql`
          query DictionarySelect($pid: ID!) {
            dictionarySelect(pid: $pid) {
              id
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.dictionarySelect!)));
  }

  create(input: DictionaryCreateInput): Observable<string> {
    return this.http
      .post('/api/dictionary', input)
      .pipe(map(() => DictionaryMessage.CreatedSuccess));
  }

  update(input: DictionaryUpdateInput): Observable<string> {
    return this.http
      .patch(`/api/dictionary`, input)
      .pipe(map(() => DictionaryMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http
      .delete(`/api/dictionary/${id}`)
      .pipe(map(() => DictionaryMessage.DeletedSuccess));
  }
}

import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Language } from './language.model';
import { LanguagePaginationInput } from './pagination.input';
import { LanguageCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { LanguageMessage } from './language.enum';
import { LanguageUpdateInput } from './update.input';
import { LanguageSelect } from './select.output';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  language(id: string): Observable<Language> {
    return this.apollo
      .query<{ language: Language }>({
        variables: { id },
        query: gql`
          query language($id: ID!) {
            language(id: $id) {
              id
              key
              value
              languageCode
            }
          }
        `
      })
      .pipe(map((x) => x.data?.language));
  }

  languages(input: LanguagePaginationInput): Observable<BasePagination<Language>> {
    return this.apollo
      .query<{ languages: BasePagination<Language> }>({
        variables: input,
        query: gql`
          query Languages(
            $skip: Int
            $take: Int
            $where: LanguageWhereInput
            $orderBy: [LanguageOrderInput!]
          ) {
            languages(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                key
                value
                languageCode
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.languages!)));
  }

  languageSelect(subjectId: string): Observable<LanguageSelect[]> {
    return this.apollo
      .query<{ languageSelect: LanguageSelect[] }>({
        variables: { subjectId },
        query: gql`
          query LanguageSelect($subjectId: ID!) {
            languageSelect(subjectId: $subjectId) {
              id
              key
              value
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.languageSelect!)));
  }

  create(input: LanguageCreateInput): Observable<string> {
    return this.http.post('/api/language', input).pipe(map(() => LanguageMessage.CreatedSuccess));
  }

  update(input: LanguageUpdateInput): Observable<string> {
    return this.http.patch(`/api/language`, input).pipe(map(() => LanguageMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/language/${id}`).pipe(map(() => LanguageMessage.DeletedSuccess));
  }
}

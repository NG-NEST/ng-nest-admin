import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Subject } from './subject.model';
import { SubjectPaginationInput } from './pagination.input';
import { SubjectCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { SubjectMessage } from './subject.enum';
import { SubjectUpdateInput } from './update.input';
import { SubjectSelect } from './select.output';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  subject(id: string): Observable<Subject> {
    return this.apollo
      .query<{ subject: Subject }>({
        variables: { id },
        query: gql`
          query Subject($id: ID!) {
            subject(id: $id) {
              id
              description
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => x.data?.subject));
  }

  subjects(input: SubjectPaginationInput): Observable<BasePagination<Subject>> {
    return this.apollo
      .query<{ subjects: BasePagination<Subject> }>({
        variables: input,
        query: gql`
          query Subjects(
            $skip: Int
            $take: Int
            $where: SubjectWhereInput
            $orderBy: [SubjectOrderInput!]
          ) {
            subjects(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                name
                code
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.subjects!)));
  }

  subjectSelect(): Observable<SubjectSelect[]> {
    return this.apollo
      .query<{ subjectSelect: SubjectSelect[] }>({
        query: gql`
          query SubjectSelect {
            subjectSelect {
              id
              name
              code
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.subjectSelect!)));
  }

  create(input: SubjectCreateInput): Observable<string> {
    return this.http.post('/api/subject', input).pipe(map(() => SubjectMessage.CreatedSuccess));
  }

  update(input: SubjectUpdateInput): Observable<string> {
    return this.http.patch(`/api/subject`, input).pipe(map(() => SubjectMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/subject/${id}`).pipe(map(() => SubjectMessage.DeletedSuccess));
  }
}

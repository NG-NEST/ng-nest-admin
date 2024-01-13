import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Subject } from './subject.model';
import { SubjectPaginationInput } from './subject-pagination.input';
import { CreateSubjectInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { SubjectMessage } from './subject.enum';
import { UpdateSubjectInput } from './update.input';
import { SubjectSelect } from './subject-select.output';
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
          query data($id: ID!) {
            subject(id: $id) {
              id
              description
              name
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
          query data($skip: Int, $take: Int, $where: SubjectWhereInput, $orderBy: [SubjectOrderInput!]) {
            subjects(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                createdAt
                description
                id
                name
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.subjects!)));
  }

  subjectSelect(): Observable<SubjectSelect[]> {
    return this.apollo
      .watchQuery<{ subjectSelect: SubjectSelect[] }>({
        query: gql`
          query data {
            subjectSelect {
              id
              name
            }
          }
        `
      })
      .valueChanges.pipe(map((x) => cloneDeep(x.data?.subjectSelect!)));
  }

  createSubject(createSubject: CreateSubjectInput): Observable<string> {
    return this.http.post('/api/subject', createSubject).pipe(map(() => SubjectMessage.CreatedSuccess));
  }

  updateSubject(updateSubject: UpdateSubjectInput): Observable<string> {
    return this.http.put(`/api/subject`, updateSubject).pipe(map(() => SubjectMessage.UpdatedSuccess));
  }

  deleteSubject(id: string): Observable<string> {
    return this.http.delete(`/api/subject/${id}`).pipe(map(() => SubjectMessage.DeletedSuccess));
  }
}

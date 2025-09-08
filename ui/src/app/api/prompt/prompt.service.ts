import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { BasePagination } from '@ui/core';
import { Prompt } from './prompt.model';
import { PromptPaginationInput } from './pagination.input';
import { PromptCreateInput } from './create.input';
import { cloneDeep } from 'lodash-es';
import { PromptMessage } from './prompt.enum';
import { PromptUpdateInput } from './update.input';
import { PromptSelectOutput } from './select.output';
import { HttpClient } from '@angular/common/http';
import { PromptSelectInput } from './select.input';

@Injectable({ providedIn: 'root' })
export class PromptService {
  apollo = inject(Apollo);
  http = inject(HttpClient);

  prompt(id: string): Observable<Prompt> {
    return this.apollo
      .query<{ prompt: Prompt }>({
        variables: { id },
        query: gql`
          query prompt($id: ID!) {
            prompt(id: $id) {
              id
              name
              user
              system
              modelType
              modelId
              userVars
              description
            }
          }
        `
      })
      .pipe(map((x) => x.data?.prompt));
  }

  prompts(input: PromptPaginationInput): Observable<BasePagination<Prompt>> {
    return this.apollo
      .query<{ prompts: BasePagination<Prompt> }>({
        variables: input,
        query: gql`
          query prompts(
            $skip: Int
            $take: Int
            $where: PromptWhereInput
            $orderBy: [PromptOrderInput!]
          ) {
            prompts(skip: $skip, take: $take, where: $where, orderBy: $orderBy) {
              count
              data {
                id
                name
                modelType
                modelId
                description
                createdAt
                updatedAt
              }
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.prompts!)));
  }

  promptSelect(input: PromptSelectInput): Observable<PromptSelectOutput[]> {
    return this.apollo
      .query<{ promptSelect: PromptSelectOutput[] }>({
        variables: input,
        query: gql`
          query PromptSelect($where: PromptWhereInput, $orderBy: [PromptOrderInput!]) {
            promptSelect(where: $where, orderBy: $orderBy) {
              id
              name
              user
              system
              modelType
              modelId
              userVars
              description
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.promptSelect!)));
  }

  create(input: PromptCreateInput): Observable<string> {
    return this.http
      .post<Prompt>('/api/prompt', input)
      .pipe(map(() => PromptMessage.CreatedSuccess));
  }

  update(input: PromptUpdateInput): Observable<string> {
    return this.http
      .patch<Prompt>(`/api/prompt`, input)
      .pipe(map(() => PromptMessage.UpdatedSuccess));
  }

  delete(id: string): Observable<string> {
    return this.http.delete(`/api/prompt/${id}`).pipe(map(() => PromptMessage.DeletedSuccess));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { LogsOutput } from './logs.output';

@Injectable({ providedIn: 'root' })
export class LogsService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  logs(): Observable<LogsOutput> {
    return this.apollo
      .query<{ logs: LogsOutput }>({
        query: gql`
          query Logs {
            logs {
              cache {
                extension
                name
                type
              }
              error {
                extension
                name
                type
              }
              http {
                extension
                name
                type
              }
              info {
                extension
                name
                type
              }
              prisma {
                extension
                name
                type
              }
              warn {
                extension
                name
                type
              }
            }
          }
        `
      })
      .pipe(map((x) => x.data?.logs));
  }

  sse() {
    return this.http.get('/api/logs');
  }

  downloadFile(type: string, name: string) {
    return this.http.get(`/api/logs/${type}/${name}`, { responseType: 'blob' });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CacheKeysInput } from './cache-keys.input';
import { Cache } from './cache.model';
import { cloneDeep } from 'lodash-es';
import { CacheMessage } from './cache.enum';
import { CacheUpdateInput } from './update.input';
import { CacheGroup } from './cache-group.model';

@Injectable({ providedIn: 'root' })
export class CacheService {
  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) {}

  cacheKeys(input?: CacheKeysInput): Observable<CacheGroup[]> {
    return this.apollo
      .query<{ cacheKeys: CacheGroup[] }>({
        variables: input,
        query: gql`
          query Cache($key: String) {
            cacheKeys(key: $key) {
              id
              type
              keys
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.cacheKeys)));
  }

  cache(key: string): Observable<Cache> {
    return this.apollo
      .query<{ cache: Cache }>({
        variables: { key },
        query: gql`
          query Cache($key: String!) {
            cache(key: $key) {
              expiretime
              key
              value
            }
          }
        `
      })
      .pipe(map((x) => cloneDeep(x.data?.cache!)));
  }

  update(input: CacheUpdateInput): Observable<string> {
    return this.http.patch(`/api/cache`, input).pipe(map(() => CacheMessage.UpdatedSuccess));
  }

  delete(key: string): Observable<string> {
    return this.http
      .delete(`/api/cache`, { body: { key } })
      .pipe(map(() => CacheMessage.DeletedSuccess));
  }

  deleteAll(): Observable<string> {
    return this.http.delete(`/api/cache/all`).pipe(map(() => CacheMessage.DeletedAllSuccess));
  }
}

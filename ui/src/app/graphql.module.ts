import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = '/graphql';
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only'
      }
    },
    link: httpLink.create({ uri }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}

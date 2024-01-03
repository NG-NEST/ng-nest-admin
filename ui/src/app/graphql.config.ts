import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';

const uri = '/graphql';
export function CreateApollo(httpLink: HttpLink): ApolloClientOptions<any> {
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

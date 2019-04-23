import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import fetch from 'unfetch';

import {Config} from '../common/config';

export const client = new ApolloClient({
  fetch,
  uri: Config.get('api.url')
});
client.defaultOptions = {
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'network-only'
  },
  watchQuery: {
    errorPolicy: 'ignore',
    fetchPolicy: 'network-only'
  }
};

export class HiltonApi {
  static query(query: string): Promise<any> {
    return client.query({query: gql`query ${query}`})
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }

  static mutation(query: string): Promise<any> {
    return client.mutate({mutation: gql`mutation ${query}`})
      .catch((error: Error) => {
        console.error(error);
        throw error;
      });
  }
}

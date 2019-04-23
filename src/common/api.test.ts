import {HiltonApi} from './api';

describe('api', () => {
  const api = require('./api');
  const apolloClient = api.client;

  afterEach(() => {
    api.client = apolloClient;
  });

  describe('query', () => {
    it('should dispatch a loading action', async () => {
      const query: string = '{test}';
      api.client = {query: jest.fn(() => Promise.resolve())};

      await HiltonApi.query(query);
      expect(api.client.query).toBeCalledWith({query: `query ${query}`});
    });
  });

  describe('mutation', () => {
    it('should dispatch a loading action', async () => {
      const query: string = '{test}';
      api.client = {query: jest.fn(() => Promise.resolve())};

      await HiltonApi.mutation(query);
      expect(api.client.query).toBeCalledWith({query: `mutation ${query}`});
    });
  });
});

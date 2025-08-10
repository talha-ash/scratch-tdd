import { apiClientFactory } from './apiClient';
import { tokenStore } from './tokenStore';
// import { REFRESH_ENDPOINT } from '../constants';
import { REFRESH_ENDPOINT } from '~core/shared/constants';
import * as constants from './apiClient/constants';
import { graphqlClientFactory } from './graphqlClient';

const apiClient = apiClientFactory({
    baseUrl: 'http://localhost:4000/api/v1/',
    refreshEndpoint: REFRESH_ENDPOINT,
    getToken: tokenStore.getAccessToken,
    setTokenAndUser: tokenStore.setTokenAndUserType,
});

const graphqlClient = graphqlClientFactory({
    baseUrl: 'http://localhost:4000/api/v1/',
    refreshEndpoint: REFRESH_ENDPOINT,
    getToken: () =>
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzY3JhdGNoX2FwcCIsImV4cCI6MTc1Mzk2NTgwOSwiaWF0IjoxNzUzOTY1NjI5LCJpc3MiOiJzY3JhdGNoX2FwcCIsImp0aSI6IjMzOTY2NTUwLTE4MDUtNDk4NC1iZWI0LWJlNmY5NGI4YzA3NSIsIm5iZiI6MTc1Mzk2NTYyOCwic3ViIjoiMiIsInR5cCI6ImFjY2VzcyJ9.9iRBuofh2M6_wA-g3UNwVF7Gq5MO4ccd5NGgvtNBE1XCsUlzgZxoee5BhnO67JNPmkGfCTTZP3atXjafKhjhMQ',
    setTokenAndUser: tokenStore.setTokenAndUserType,
    apiClient,
});

export { apiClient, apiClientFactory, constants, tokenStore, graphqlClient };

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
    getToken: tokenStore.getAccessToken,
    setTokenAndUser: tokenStore.setTokenAndUserType,
    apiClient,
});

export { apiClient, apiClientFactory, constants, tokenStore, graphqlClient };

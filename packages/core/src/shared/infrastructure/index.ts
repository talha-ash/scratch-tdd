import { apiClientFactory } from './apiClient';
import { tokenStore } from './tokenStore';
// import { REFRESH_ENDPOINT } from '../constants';
import * as apiClientTypes from './apiClient/types';
import * as constants from './apiClient/constants';
import { REFRESH_ENDPOINT } from '~shared/constants';

const apiClient = apiClientFactory({
    baseUrl: 'http://localhost:4000/api/v1/',
    refreshEndpoint: REFRESH_ENDPOINT,
    getToken: tokenStore.getAccessToken,
    setTokenAndUser: tokenStore.setTokenAndUserType,
});

export  {
    apiClientFactory,
    tokenStore,   
    constants,
    apiClient,
};



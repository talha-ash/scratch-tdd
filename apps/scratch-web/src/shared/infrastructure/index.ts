import { apiClientFactory } from './apiClient';
import { createRouter } from '@tanstack/react-router';

import type { MyRouterContext } from '~/routes/__root';
import { routeTree } from '~/routeTree.gen';
import { tokenStore } from './tokenStore';
import { REFRESH_ENDPOINT } from '../constants';

export const router = createRouter({ routeTree, context: { authToken: undefined } });

export const RouterContextInjector = ({
    context,
    children,
}: {
    context?: MyRouterContext;
    children: ({ authToken }: MyRouterContext) => React.ReactNode;
}) => {
    const authToken = tokenStore.useTokenStore();
    return children(context ?? { authToken });
};

export const apiClient = apiClientFactory({
    baseUrl: 'http://localhost:4000/api/v1/',
    refreshEndpoint: REFRESH_ENDPOINT,
    getToken: tokenStore.getAccessToken,
    setTokenAndUser: tokenStore.setTokenAndUserType,
});

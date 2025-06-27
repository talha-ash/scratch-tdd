import { apiClientFactory } from './apiClient';
import { createRouter } from '@tanstack/react-router';
import { authStore } from '~/contexts/auth/authStore';
import type { MyRouterContext } from '~/routes/__root';
import { routeTree } from '~/routeTree.gen';

export const router = createRouter({ routeTree, context: { auth: undefined } });

export const RouterContextInjector = ({
    context,
    children,
}: {
    context?: MyRouterContext;
    children: ({ auth }: MyRouterContext) => React.ReactNode;
}) => {
    const auth = authStore.useAuthStore();
    return children(context ?? { auth });
};

export const apiClient = apiClientFactory(
    'http://localhost:4000/api/v1/',
    'refresh_token',
    authStore.getAccessToken,
    authStore.setAccessToken,
);

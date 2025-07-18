import { createRouter } from '@tanstack/react-router';

import type { MyRouterContext } from '~/routes/__root';
import { routeTree } from '~/routeTree.gen';
import { CoreShared } from 'core';

export const router = createRouter({ routeTree, context: { authToken: undefined } });

export const RouterContextInjector = ({
    context,
    children,
}: {
    context?: MyRouterContext;
    children: ({ authToken }: MyRouterContext) => React.ReactNode;
}) => {
    const authToken = CoreShared.tokenStore.useTokenStore();
    return children(context ?? { authToken });
};

import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';
import type { TokenStoreState } from '~/shared/infrastructure/tokenStore/createTokenStore';
import '../app.css';

export interface MyRouterContext {
    // The ReturnType of your useAuth hook or the value of your AuthContext
    authToken: TokenStoreState | undefined;
}

export const Route = createRootRouteFactory();

export function createRootRouteFactory() {
    return createRootRouteWithContext<MyRouterContext>()({
        component: () => {
            return (
                <>
                    <Outlet />
                    <Toaster />
                    <TanStackRouterDevtools />
                </>
            );
        },
    });
}

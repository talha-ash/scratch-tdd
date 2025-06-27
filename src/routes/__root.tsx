import '../app.css';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';
import type { AuthStoreState } from '~/contexts/auth/authStore/createAuthStore';

export interface MyRouterContext {
    // The ReturnType of your useAuth hook or the value of your AuthContext
    auth: AuthStoreState | undefined;
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

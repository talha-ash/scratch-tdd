import { createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import type { JSX } from 'react';
import { Toaster } from 'react-hot-toast';
import { createRootRouteFactory } from '~/routes/__root';
import { ComposeProvider } from '~/shared/diContext';
import { RouterContextInjector } from '~/shared/infrastructure';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';

export async function mountComponentWithRouter(component: () => JSX.Element) {
    const providers = [createToastProvider(), createQueryClientProvider()];
    const RootRoute = createRootRouteFactory();

    const Route = createRoute({
        component: component,
        path: '/',
        getParentRoute: () => RootRoute,
    });

    const router = createRouter({
        defaultPendingMinMs: 0,
        routeTree: RootRoute.addChildren([Route]),
        context: {
            auth: undefined!,
        },
    });

    cy.mount(
        <>
            <ComposeProvider providers={providers}>
                <div>
                    <RouterContextInjector>
                        {({ auth }) => (
                            <>
                                <RouterProvider<typeof router> router={router} context={{ auth }} />
                                <Toaster />
                            </>
                        )}
                    </RouterContextInjector>
                </div>
            </ComposeProvider>
            ,
        </>,
    );
    await router.navigate({ to: '/' });
}

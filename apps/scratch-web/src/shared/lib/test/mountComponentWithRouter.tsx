import { RouterProvider, createRoute, createRouter } from '@tanstack/react-router';
import { Toaster } from 'react-hot-toast';
import { CoreShared } from 'core';
import type { JSX } from 'react';
import { createRootRouteFactory } from '~/routes/__root';
import { RouterContextInjector } from '~/shared/infrastructure';
import { createQueryClientProvider } from '~/shared/infrastructure/tanStackQueryClient';
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
            authToken: undefined!,
        },
    });

    cy.mount(
        <>
            <CoreShared.ComposeProvider providers={providers}>
                <div>
                    <RouterContextInjector>
                        {({ authToken }) => (
                            <>
                                <RouterProvider<typeof router>
                                    router={router}
                                    context={{ authToken }}
                                />
                                <Toaster />
                            </>
                        )}
                    </RouterContextInjector>
                </div>
            </CoreShared.ComposeProvider>
            ,
        </>,
    );
    await router.navigate({ to: '/' });
}

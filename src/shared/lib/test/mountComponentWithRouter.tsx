import { createRootRoute, createRoute, createRouter, RouterProvider } from '@tanstack/react-router';
import type { JSX } from 'react';
import { Toaster } from 'react-hot-toast';
import { ComposeProvider } from '~/shared/diContext';
import { createQueryClientProvider } from '~/shared/infrastructure/tanqStackQueryClient';
import { createToastProvider } from '~/shared/infrastructure/toast/toastProvider';

export async function mountComponentWithRouter(component: () => JSX.Element) {
    const providers = [createToastProvider(), createQueryClientProvider()];
    const RootRoute = createRootRoute();

    const Route = createRoute({
        component: component,
        path: '/',
        getParentRoute: () => RootRoute,
    });

    const router = createRouter({
        defaultPendingMinMs: 0,
        routeTree: RootRoute.addChildren([Route]),
    });

    cy.mount(
        <>
            <ComposeProvider providers={providers}>
                <div>
                    <RouterProvider<typeof router> router={router} />
                    <Toaster />
                </div>
            </ComposeProvider>
            ,
        </>,
    );
    await router.navigate({ to: '/' });
}

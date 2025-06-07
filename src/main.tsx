import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ComposeProvider, composeProviders } from './shared/diContext';
import { createToastNotificationProvider } from './shared/infrastructure/toast';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    const providers = [createToastNotificationProvider()];

    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ComposeProvider providers={providers}>
                    <RouterProvider router={router} />
                </ComposeProvider>
            </QueryClientProvider>
        </StrictMode>,
    );
}

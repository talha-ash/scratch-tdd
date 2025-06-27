import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';

import { ComposeProvider } from './shared/diContext';
import { createToastProvider } from './shared/infrastructure/toast/toastProvider';
import { router, RouterContextInjector } from './shared/infrastructure';
import { createQueryClientProvider } from './shared/infrastructure/tanqStackQueryClient';

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    const providers = [createToastProvider(), createQueryClientProvider()];
    root.render(
        <StrictMode>
            <ComposeProvider providers={providers}>
                <RouterContextInjector>
                    {({ auth }) => <RouterProvider router={router} context={{ auth }} />}
                </RouterContextInjector>
            </ComposeProvider>
        </StrictMode>,
    );
}

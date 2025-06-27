import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';

import { ComposeProvider } from './shared/diContext';
import { createToastProvider } from './shared/infrastructure/toast/toastProvider';
import { apiClient, router, RouterContextInjector } from './shared/infrastructure';
import { createQueryClientProvider } from './shared/infrastructure/tanqStackQueryClient';
import { authStore } from './contexts/auth/authStore';
import type { AxiosErrorType } from './shared/infrastructure/apiClient/types';
import { ScreenLoader } from './components/ui/ScreenLoader';

// Render the app
initApp(authStore.setAccessToken, renderApp, renderScreenLoader);

async function initApp(
    setAccessToken: (token: string) => void,
    renderApp: () => void,
    renderLoader: () => void,
) {
    renderLoader();
    const result = await apiClient.get<{ token: string }, AxiosErrorType>('refresh_token');

    if (result.isOk()) {
        setAccessToken(result.value.data.token);
    } else {
        setAccessToken('');
    }
    removeLoader();
    renderApp();
}

function renderApp() {
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
}

function removeLoader() {
    const rootElement = document.getElementById('root')!;
    rootElement.innerHTML = '';
}
function renderScreenLoader() {
    const rootElement = document.getElementById('root')!;
    if (!rootElement.innerHTML) {
        const root = ReactDOM.createRoot(rootElement);

        root.render(
            <StrictMode>
                <ScreenLoader />
            </StrictMode>,
        );
    }
}

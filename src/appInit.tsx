import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { ScreenLoader } from './components/ui/ScreenLoader';
import type { User } from './contexts/auth/domain/user';
import { REFRESH_ENDPOINT } from './shared/constants';
import { ComposeProvider } from './shared/diContext';
import { apiClient, router, RouterContextInjector } from './shared/infrastructure';
import type { AxiosErrorType } from './shared/infrastructure/apiClient/types';
import { createQueryClientProvider } from './shared/infrastructure/tanqStackQueryClient';
import { createToastProvider } from './shared/infrastructure/toast/toastProvider';

async function startApp(setTokenAndUserType: (token: string, user: User | null) => void) {
    renderScreenLoader();
    const result = await apiClient.get<{ token: string; user: User }, AxiosErrorType>(
        REFRESH_ENDPOINT,
    );

    if (result.isOk()) {
        setTokenAndUserType(result.value.data.token, result.value.data.user);
    } else {
        setTokenAndUserType('', null);
    }
    removeScreenLoader();
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
                        {({ authToken }) => (
                            <RouterProvider router={router} context={{ authToken }} />
                        )}
                    </RouterContextInjector>
                </ComposeProvider>
            </StrictMode>,
        );
    }
}

function removeScreenLoader() {
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

const appInit = {
    startApp,    
    renderApp,
    removeScreenLoader,
    renderScreenLoader,
};

export { appInit };

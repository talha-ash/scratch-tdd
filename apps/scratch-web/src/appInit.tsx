import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { CoreShared } from 'core';
import { ScreenLoader } from './components/ui/ScreenLoader';
import { RouterContextInjector, router } from './shared/infrastructure';
import { createQueryClientProvider } from './shared/infrastructure/tanStackQueryClient';
import { createToastProvider } from './shared/infrastructure/toast/toastProvider';

import type { ApiClientTypes, AuthDomainTypes } from 'core';

async function startApp(
    setTokenAndUserType: (token: string, user: AuthDomainTypes.User | null) => void,
) {
    renderScreenLoader();
    const result = await CoreShared.apiClient.get<
        { token: string; user: AuthDomainTypes.User },
        ApiClientTypes.AxiosErrorType
    >(CoreShared.REFRESH_ENDPOINT);

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
        console.log('I am Running');
        const root = ReactDOM.createRoot(rootElement);
        const providers = [createToastProvider(), createQueryClientProvider()];
        root.render(
            <StrictMode>
                <CoreShared.ComposeProvider providers={providers}>
                    <RouterContextInjector>
                        {({ authToken }) => (
                            <RouterProvider router={router} context={{ authToken }} />
                        )}
                    </RouterContextInjector>
                </CoreShared.ComposeProvider>
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

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { router } from '.';

import { CoreShared } from 'core';

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        //Todo show suitable message to user
        onError: (error) => {
            if (error.message == 'refresh_token') {
                CoreShared.tokenStore.setAccessToken(null);
                router.navigate({ to: '/login' });
                return;
            }
            switch (error.type) {
                case 'network':
                    toast.error(error.message);
                    break;
                case 'request':
                    toast.error(error.message);
                    break;
                case 'unknown':
                    toast.error(error.message);
                    break;
                case 'http':
                    if (error.status > 500) {
                        toast.error(error.message as string);
                    }
                    break;
            }
        },
    }),
    queryCache: new QueryCache({
        onError: (error) => {
            if (error.message == 'refresh_token') {
                CoreShared.tokenStore.setAccessToken(null);
                router.navigate({ to: '/login' });
                return;
            }
            switch (error.type) {
                case 'network':
                    toast.error(error.message);
                    break;
                case 'request':
                    toast.error(error.message);
                    break;
                case 'unknown':
                    toast.error(error.message);
                    break;
                case 'http':
                    if (error.status > 500) {
                        toast.error(error.message as string);
                    }
                    break;
            }
        },
    }),
});

export function createQueryClientProvider() {
    console.log('createQueryClientProvider', queryClient);
    return { Component: QueryClientProvider, props: { client: queryClient } };
}

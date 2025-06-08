import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const queryClient = new QueryClient({
    mutationCache: new MutationCache({
        //Todo show suitable message to user
        onError: (error) => {
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
                        toast.error(error.message);
                    }
                    break;
            }
        },
    }),
});

export function createQueryClientProvider() {
    return { Component: QueryClientProvider, props: { client: queryClient } };
}

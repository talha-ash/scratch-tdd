import {
    MutationObserver,
    type MutateOptions,
    type MutationState,
    type UseMutationResult,
} from '@tanstack/react-query';
import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import { queryClient } from '~/shared/infrastructure/tanqStackQueryClient';

export function createSccessMutation<T, U>(response: T) {
    const mutation = new MutationObserver(queryClient, {
        mutationFn: async () => {
            return Promise.resolve(response);
        },
        onMutate: (text) => text,
    });

    const states: MutationState<T, unknown, void, void>[] = [];

    mutation.subscribe((state) => {
        states.push(state);
    });

    return {
        mutation: mutation as unknown as UseMutationResult<T, AxiosErrorType, U>,
        mutationWait: mutationWait,
    };
}

// Todo Need Better implementation
// R&D required for good solution
export function createErrorMutation<T, U>(error: AxiosErrorType) {
    const mutation = new MutationObserver(queryClient, {
        mutationFn: async () => {
            return Promise.reject(error);
        },
        retry: 0,
        throwOnError: false,
        _defaulted: true,
        onMutate: (text) => text,
    });
    const states: MutationState<T, unknown, void, void>[] = [];

    mutation.subscribe((state) => {
        states.push(state);
    });

    return {
        ...mutation,
        mutate: async (payload: void, options: MutateOptions) => {
            mutation.mutate(payload).catch(() => undefined);

            if (options.onError) {
                options.onError(error, undefined, undefined);
            }
        },
    } as unknown as UseMutationResult<T, AxiosErrorType, U>;
}

function mutationWait(timeout: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

import { useMutation } from '@tanstack/react-query';

import { register } from './registerAdapter';
import type { RegisterPayload } from './types';

export const useRegistrationMutation = () => {
    const mutation = useMutation({
        mutationFn: async (payload: RegisterPayload) => {
            const result = await register(payload);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value.data;
        },
    });

    return { mutation };
};

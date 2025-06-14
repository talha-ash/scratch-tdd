import { useMutation } from '@tanstack/react-query';
import type { RegisterPayload } from './registerService';
import { register } from './registerAdapter';

export interface IRegisterResponse {
    user: {
        id: string;
        username: string;
        age: string;
        email: string;
    };
    token: string;
}

export const useRegisterMutation = () => {
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

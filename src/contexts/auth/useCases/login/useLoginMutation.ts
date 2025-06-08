import { useMutation } from '@tanstack/react-query';
import { login } from './LoginAdapter';

export interface LoginResponse {
    user: {
        id: string;
        username: string;
        age: string;
        email: string;
    };
    token: string;
}

export const useLoginMutation = () => {
    const mutation = useMutation({
        mutationFn: async (payload: { email: string; password: string }) => {
            const result = await login(payload.email, payload.password);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value;
        },
    });

    return { mutation };
};

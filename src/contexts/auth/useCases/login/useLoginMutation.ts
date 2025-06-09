import { useMutation } from '@tanstack/react-query';
import { login } from './loginAdapter';

export interface ILoginResponse {
    user: {
        id: string;
        username: string;
        age: string;
        email: string;
    };
    token: string;
}
export interface ILoginMutationPayload {
    email: string;
    password: string;
}

export const useLoginMutation = () => {
    const mutation = useMutation({
        mutationFn: async (payload: ILoginMutationPayload) => {
            const result = await login(payload.email, payload.password);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value.data;
        },
    });

    return { mutation };
};

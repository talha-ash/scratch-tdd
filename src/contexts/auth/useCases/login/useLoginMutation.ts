import { useMutation } from '@tanstack/react-query';
import { login } from './loginApis';
import type { User } from '../../domain/user';
import type { LoginMutationPayload } from './loginService';

export interface ILoginResponse {
    user: User;
    token: string;
}

export const useLoginMutation = () => {
    const mutation = useMutation({
        mutationFn: async (payload: LoginMutationPayload) => {
            const result = await login(payload.email, payload.password);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value.data;
        },
    });

    return { mutation };
};
export type useLoginMutation = ReturnType<typeof useLoginMutation>;
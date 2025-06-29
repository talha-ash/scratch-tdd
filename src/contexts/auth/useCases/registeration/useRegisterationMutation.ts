import { useMutation } from '@tanstack/react-query';
import type { RegisterationPayload } from './registerationService';
import { register } from './registerationApis';

export interface IRegisterationResponse {
    user: {
        id: string;
        username: string;
        age: string;
        email: string;
    };
    token: string;
}

export const useRegisterationMutation = () => {
    const mutation = useMutation({
        mutationFn: async (payload: RegisterationPayload) => {
            const result = await register(payload);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value.data;
        },
    });

    return { mutation };
};

export type useRegisterationMutationType = ReturnType<typeof useRegisterationMutation>;

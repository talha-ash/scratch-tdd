import * as v from 'valibot';
import type { getRegisterSchema } from './registerService';

export interface IRegisterResponse {
    user: {
        id: string;
        username: string;
        age: string;
        email: string;
    };
    token: string;
}

export type RegisterPayload = v.InferOutput<ReturnType<typeof getRegisterSchema>>;

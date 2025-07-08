import * as v from 'valibot';
import type { User } from 'src/contexts/auth/domain';
import type { getLoginSchema } from './loginService';

export interface ILoginResponse {
    user: User;
    token: string;
}
export interface ILoginMutationPayload {
    email: string;
    password: string;
}

export type LoginPayload = v.InferOutput<ReturnType<typeof getLoginSchema>>;
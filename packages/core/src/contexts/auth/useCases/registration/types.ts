import * as v from 'valibot';
import type { getRegisterSchema } from './registerService';
import type { User } from '~core/contexts/auth/domain';

export interface IRegisterResponse {
    user: User;
    token: string;
}

export type RegisterPayload = v.InferOutput<ReturnType<typeof getRegisterSchema>>;

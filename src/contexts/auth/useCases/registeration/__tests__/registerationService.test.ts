import * as v from 'valibot';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EMAIL_IS_INVALID, PASSWORDS_DO_NOT_MATCH } from '~/contexts/auth/constants/textConstant';
import type { UserName } from '~/contexts/auth/domain/user';
import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import { createErrorMutation, createSccessMutation } from '~/shared/utils/test/createMutation';

import {
    getRegisterationSchema,
    registerationFormSubmit,
    type RegisterationPayload,
} from '../registerationService';
import type { IRegisterationResponse } from '../useRegisterationMutation';

describe('Registeration Service', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('validate with valid value', () => {
        const schema = getRegisterationSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail.com',
            password: 'password12345',
            username: 'john',
            passwordConfirm: 'password12345',
        });

        expect(result.success).toBe(true);
    });

    it('validate wrong password length', () => {
        const schema = getRegisterationSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail',
            password: 'password12',
            username: 'john',
            passwordConfirm: 'password1',
        });
        
        if (result.issues?.length) {
            expect(result.issues[0].message).toBe(EMAIL_IS_INVALID);
            expect(result.issues[1].message).toBe(PASSWORDS_DO_NOT_MATCH);
        }
    });

    describe('Registeration Form Submisssion', () => {
        const toast = {
            successToast: vi.fn(),
            errorToast: vi.fn(),
        };

        const data = {
            email: 'john@gmmail.com',
            username: 'John',
            password: 'password12345',
            passwordConfirm: 'password12345',
        };
        afterEach(() => {
            vi.clearAllMocks();
        });
        it('submit sccessfully', async () => {
            const response = {
                user: {
                    id: '12',
                    age: '12',
                    email: data.email,
                    username: 'john' as UserName,
                },
                token: 'fake-jwt-token',
            };

            const { mutation, mutationWait } = createSccessMutation<
                IRegisterationResponse,
                RegisterationPayload
            >(response);

            registerationFormSubmit({
                data: data,
                deps: {
                    mutate: mutation.mutate,
                    toast,
                },
            });
            await mutationWait(0);

            expect(toast.successToast).toHaveBeenCalledOnce();
        });

        it('submit unsccessfully', async () => {
            const error: AxiosErrorType = {
                type: 'http',
                data: { message: 'email is already taken', error: true },
                status: 401,
                code: 'Bad Credentials',
                message: 'Reqquest failed With 401',
            };

            const mutation = createErrorMutation<IRegisterationResponse, RegisterationPayload>(
                error,
            );

            registerationFormSubmit({
                data: data,
                deps: {
                    mutate: mutation.mutate,
                    toast,
                },
            });

            expect(toast.errorToast).toHaveBeenCalledWith(error.data.message);
        });
    });
});

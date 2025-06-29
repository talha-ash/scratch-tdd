import * as v from 'valibot';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { EMAIL_IS_INVALID, PASSWORD_IS_INCORRECT } from '~/contexts/auth/constants/textConstant';
import type { UserName } from '~/contexts/auth/domain/user';
import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import { createErrorMutation, createSccessMutation } from '~/shared/utils/test/createMutation';
import { getLoginSchema, loginFormSubmit, type LoginMutationPayload } from '../loginService';
import type { ILoginResponse } from '../useLoginMutation';

describe('Login validation', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });
    it('validate with valid value', () => {
        const schema = getLoginSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail.com',
            password: 'password12345',
        });

        expect(result.success).toBe(true);
    });

    it('validate wrong password length', () => {
        const schema = getLoginSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail',
            password: 'passwor',
        });

        if (result.issues?.length) {
            expect(result.issues[0].message).toBe(EMAIL_IS_INVALID);
            expect(result.issues[1].message).toBe(PASSWORD_IS_INCORRECT);
        }
    });

    describe('Login Form Submisssion', () => {
        const navigate = vi.fn();
        const toast = {
            successToast: vi.fn(),
            errorToast: vi.fn(),
        };
        const setAccessToken = vi.fn();
        const setUser = vi.fn();
        const data = { email: 'john@gmmail.com', password: 'password12345' };
        afterEach(() => {
            vi.clearAllMocks();
        });
        it('submit sccessfully', async () => {
            const response = {
                user: { id: '1', email: data.email, username: 'john' as UserName },
                token: 'fake-jwt-token',
            };

            const { mutation, mutationWait } = createSccessMutation<
                ILoginResponse,
                LoginMutationPayload
            >(response);

            loginFormSubmit({
                data: data,
                deps: {
                    mutate: mutation.mutate,
                    navigate: navigate,
                    toast,
                    setAccessToken: setAccessToken,
                    setUser: setUser,
                },
            });
            await mutationWait(0);

            expect(setAccessToken).toHaveBeenCalledWith('fake-jwt-token');
            expect(navigate).toHaveBeenCalledWith({ to: '/' });
            expect(setUser).toHaveBeenCalledWith(response.user);
            expect(toast.successToast).toHaveBeenCalledOnce();
        });

        it('submit unsccessfully', async () => {
            const error: AxiosErrorType = {
                type: 'http',
                data: { message: 'User Not Found', error: true },
                status: 404,
                code: 'Bad Request',
                message: 'Reqquest failed With 404',
            };

            const mutation = createErrorMutation<ILoginResponse, LoginMutationPayload>(error);

            loginFormSubmit({
                data: data,
                deps: {
                    mutate: mutation.mutate,
                    navigate: navigate,
                    toast,
                    setAccessToken: setAccessToken,
                    setUser: setUser,
                },
            });

            expect(toast.errorToast).toHaveBeenCalledWith(error.data.message);
        });
    });
});

import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import type { IToastNotification } from '~/shared/infrastructure/toast';
import {
    EMAIL_IS_INVALID,
    LOGIN_SUCCESSFULLY,
    PASSWORD_IS_INCORRECT,
} from '../../constants/textConstant';
import * as v from 'valibot';
import { AXIOS_ERROR_HTTP } from '~/shared/infrastructure/apiClient/constants';
import type { UseNavigateResult } from '@tanstack/react-router';
import type { useLoginMutation } from './useLoginMutation';
import type { User } from '../../domain/user';

export function loginFailedMessage(
    error: AxiosErrorType,
    errorToast: IToastNotification['errorToast'],
) {
    if (error.type == AXIOS_ERROR_HTTP) {
        errorToast(error.data.message);
    }
}

export function onLoginSuccessfully(successToast: IToastNotification['successToast']) {
    successToast(LOGIN_SUCCESSFULLY);
}

export type LoginMutationPayload = v.InferOutput<ReturnType<typeof getLoginSchema>>;
export function getLoginSchema() {
    return v.object({
        email: v.message(v.pipe(v.string(), v.email()), EMAIL_IS_INVALID),
        password: v.message(v.pipe(v.string(), v.minLength(8)), PASSWORD_IS_INCORRECT),
    });
}

export function loginFormSubmit(payload: {
    data: { email: string; password: string };
    deps: {
        toast: Pick<IToastNotification, 'successToast' | 'errorToast'>;
        mutate: useLoginMutation['mutation']['mutate'];
        navigate: UseNavigateResult<string>;
        setAccessToken: (token: string) => void;
        setUser: (user: User) => void;
    };
}) {
    const { email, password } = payload.data;
    const { toast, mutate, navigate, setAccessToken, setUser } = payload.deps;
    mutate(
        { email, password },
        {
            onSuccess: (data) => {
                setAccessToken(data.token);
                setUser(data.user);
                navigate({ to: '/' });
                onLoginSuccessfully(toast.successToast);
            },
            onError: (error) => {                
                loginFailedMessage(error, toast.errorToast);
            },
        },
    );
}

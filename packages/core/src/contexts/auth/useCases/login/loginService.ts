import * as v from 'valibot';
import type { AxiosErrorType } from '~shared/infrastructure/apiClient/types';

import {
    EMAIL_IS_INVALID,
    LOGIN_SUCCESSFULLY,
    PASSWORD_IS_INCORRECT,
} from '../../constants/textConstant';
import { AXIOS_ERROR_HTTP } from '~shared/infrastructure/apiClient/constants';
import type { User } from '~contexts/auth/domain';

export function loginFailedMessage(
    error: AxiosErrorType,
    errorToast: (message: string | string[]) => void,
) {
    if (error.type == AXIOS_ERROR_HTTP) {
        errorToast(error.data.message);
    }
}

interface onLoginSuccessfullyParams {
    callbacks: {
        successToast: (message: string) => void;
        setAccessToken: (message: string) => void;
        setUser: (user: User) => void;
        navigate: () => void;
    };
    data: {
        user: User;
        token: string;
    };
}

export function onLoginSuccessfully(payload: onLoginSuccessfullyParams) {
    const data = payload.data;
    payload.callbacks.successToast(LOGIN_SUCCESSFULLY);
    payload.callbacks.setAccessToken(data.token);
    payload.callbacks.setUser(data.user);
    payload.callbacks.navigate();
}

export function getLoginSchema() {
    return v.object({
        email: v.message(v.pipe(v.string(), v.email()), EMAIL_IS_INVALID),
        password: v.message(v.pipe(v.string(), v.minLength(8)), PASSWORD_IS_INCORRECT),
    });
}

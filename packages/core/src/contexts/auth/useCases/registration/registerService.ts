import type { AxiosErrorType } from '~core/shared/infrastructure/apiClient/types';

import {
    EMAIL_IS_INVALID,
    PASSWORD_IS_NOT_PROPER,
    PASSWORDS_DO_NOT_MATCH,
    REGISTER_SUCCESSFULLY,
    USERNAME_NOT_PROPER,
} from '../../constants/textConstant';
import * as v from 'valibot';
import { AXIOS_ERROR_HTTP } from '~core/shared/infrastructure/apiClient/constants';
import type { User } from '~core/contexts/auth/domain';

export function registerFailedMessage(
    error: AxiosErrorType,
    errorToast: (message: string | string[]) => void,
) {
    if (error.type == AXIOS_ERROR_HTTP) {
        errorToast(error.data.message);
    }
}

interface onRegisterSuccessfullyParams {
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
export function registerSuccessMessage(params: onRegisterSuccessfullyParams) {
    const data = params.data;
    params.callbacks.successToast(REGISTER_SUCCESSFULLY);
    params.callbacks.setAccessToken(data.token);
    params.callbacks.setUser(data.user);
    params.callbacks.navigate();
}

export function getRegisterSchema() {
    return v.pipe(
        v.object({
            email: v.message(v.pipe(v.string(), v.email()), EMAIL_IS_INVALID),
            password: v.message(v.pipe(v.string(), v.minLength(8)), PASSWORD_IS_NOT_PROPER),
            passwordConfirm: v.string(),
            username: v.message(v.pipe(v.string(), v.minLength(3)), USERNAME_NOT_PROPER),
        }),
        v.forward(
            v.partialCheck(
                [['password'], ['passwordConfirm']],
                (input) => input.password === input.passwordConfirm,
                PASSWORDS_DO_NOT_MATCH,
            ),
            ['passwordConfirm'],
        ),
    );
}

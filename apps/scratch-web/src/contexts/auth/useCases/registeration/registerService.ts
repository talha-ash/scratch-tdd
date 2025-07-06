import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import type { IToastNotification } from '~/shared/infrastructure/toast';
import {
    EMAIL_IS_INVALID,
    PASSWORD_IS_NOT_PROPER,
    PASSWORDS_DO_NOT_MATCH,
    REGISTER_SUCCESSFULLY,
    USERNAME_NOT_PROPER,
} from '../../constants/textConstant';
import * as v from 'valibot';
import { AXIOS_ERROR_HTTP } from '~/shared/infrastructure/apiClient/constants';

export function registerFailedMessage(
    error: AxiosErrorType,
    errorToast: IToastNotification['errorToast'],
) {
    if (error.type == AXIOS_ERROR_HTTP) {
        errorToast(error.data.message);
    }
}

export function registerSuccessMessage(successToast: IToastNotification['successToast']) {
    successToast(REGISTER_SUCCESSFULLY);
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

export type RegisterPayload = v.InferOutput<ReturnType<typeof getRegisterSchema>>;

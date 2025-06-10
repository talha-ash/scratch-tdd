import type { AxiosErrorType } from '~/shared/infrastructure/apiClient/types';
import type { IToastNotification } from '~/shared/infrastructure/toast';
import {
    EMAIL_IS_INVALID,
    LOGIN_SUCCESSFULLY,
    PASSWORD_IS_INCORRECT,
} from '../../constants/textConstant';
import * as v from 'valibot';
import { AXIOS_ERROR_HTTP } from '~/shared/infrastructure/apiClient/constants';

export function loginFailedMessage(
    error: AxiosErrorType,
    errorToast: IToastNotification['errorToast'],
) {
    if (error.type == AXIOS_ERROR_HTTP) {
        errorToast(error.data.message);
    }
}

export function loginSuccessMessage(successToast: IToastNotification['successToast']) {
    successToast(LOGIN_SUCCESSFULLY);
}

export function getLoginSchema() {
    return v.object({
        email: v.message(v.pipe(v.string(), v.email()), EMAIL_IS_INVALID),
        password: v.message(v.pipe(v.string(), v.minLength(8)), PASSWORD_IS_INCORRECT),
    });
}

export type LoginPayload = v.InferOutput<ReturnType<typeof getLoginSchema>>;

import { apiClient } from '~core/shared/infrastructure';
import type { AxiosErrorType, IHttpResponse } from '~core/shared/infrastructure/apiClient/types';
import type { ResultAsync } from 'neverthrow';
import type { IRegisterResponse, RegisterPayload } from './types';

export function register(
    payload: RegisterPayload,
): ResultAsync<IHttpResponse<IRegisterResponse>, AxiosErrorType> {
    return apiClient.post<IRegisterResponse, { user: RegisterPayload }>('/register', {
        user: payload,
    });
}

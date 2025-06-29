import { apiClient } from '~/shared/infrastructure';
import type { AxiosErrorType, IHttpResponse } from '~/shared/infrastructure/apiClient/types';
import type { ResultAsync } from 'neverthrow';
import type { RegisterationPayload } from './registerationService';
import type { IRegisterationResponse } from './useRegisterationMutation';

export function register(
    payload: RegisterationPayload,
): ResultAsync<IHttpResponse<IRegisterationResponse>, AxiosErrorType> {
    return apiClient.post<IRegisterationResponse, { user: RegisterationPayload }>('/register', {
        user: payload,
    });
}

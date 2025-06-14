import { apiClient } from '~/shared/infrastructure';
import type { AxiosErrorType, IHttpResponse } from '~/shared/infrastructure/apiClient/types';
import type { ResultAsync } from 'neverthrow';
import type { RegisterPayload } from './registerService';
import type { IRegisterResponse } from './useRegisterMutation';

export function register(
    payload: RegisterPayload,
): ResultAsync<IHttpResponse<IRegisterResponse>, AxiosErrorType> {
    return apiClient.post<IRegisterResponse, RegisterPayload>('/register', payload);
}

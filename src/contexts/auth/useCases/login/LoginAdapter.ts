import { apiClient } from '~/shared/infrastructure';
import type { AxiosErrorType, IHttpResponse } from '~/shared/infrastructure/apiClient/types';
import type { LoginResponse } from './useLoginMutation';
import type { ResultAsync } from 'neverthrow';

export function login(
    email: string,
    password: string,
): ResultAsync<IHttpResponse<LoginResponse[]>, AxiosErrorType> {
    return apiClient.post<LoginResponse[]>('/login', { email, password });
}

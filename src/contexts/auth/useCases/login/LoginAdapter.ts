import { apiClient } from '~/shared/infrastructure';
import type { AxiosErrorType, IHttpResponse } from '~/shared/infrastructure/apiClient/types';
import type { ILoginResponse } from './useLoginMutation';
import type { ResultAsync } from 'neverthrow';

export function login(
    email: string,
    password: string,
): ResultAsync<IHttpResponse<ILoginResponse>, AxiosErrorType> {
    return apiClient.post<ILoginResponse>('/login', { email, password });
}

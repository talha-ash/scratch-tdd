import type { AxiosErrorType, IHttpResponse } from '~shared/infrastructure/apiClient/types';
import type { ResultAsync } from 'neverthrow';
import type { ILoginResponse, LoginPayload } from './types';
import { apiClient } from '~shared/index';

export function login(
    email: string,
    password: string,
): ResultAsync<IHttpResponse<ILoginResponse>, AxiosErrorType> {
    return apiClient.post<ILoginResponse, LoginPayload>('/login', { email, password });
}

import type { Result, ResultAsync } from 'neverthrow';
import type { User } from '~core/contexts/auth/domain';

export interface INetworkError {
    readonly type: 'network';
    readonly message: string;
}

export interface IAuthError {
    readonly type: 'auth';
    readonly message: string;
}

export interface IRequestUnknownError {
    readonly type: 'unknown';
    readonly message: string;
}

export type GqlErrorType = INetworkError | IAuthError | IRequestUnknownError;

export interface IGraphqlRequestConfig {
    readonly document: string;
    readonly variables?: Record<string, unknown>;
}

export interface IGraphqlClient {
    request<T>(config: IGraphqlRequestConfig): ResultAsync<T, GqlErrorType>;
}

export type RefreshPromiseResolveType = Result<{ index: number }, { index: number }>;

export type getTokenType = () => string | null;
export type setTokenAndUserType = (token: string, user: User) => void;

import type { AxiosHeaders } from 'axios';
import type { ResultAsync } from 'neverthrow';
import type {
    AXIOS_ERROR_HTTP,
    AXIOS_ERROR_NETWORK,
    AXIOS_ERROR_REQUEST,
    AXIOS_ERROR_UNKNOWN,
} from './constants';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type TypeOfAxiosError =
    | typeof AXIOS_ERROR_HTTP
    | typeof AXIOS_ERROR_NETWORK
    | typeof AXIOS_ERROR_REQUEST
    | typeof AXIOS_ERROR_UNKNOWN;

export interface IHttpRequestConfig {
    readonly url: string;
    readonly method: HttpMethod;
    readonly headers?: Record<string, string>;
    readonly params?: Record<string, unknown>;
    readonly data?: unknown;
    readonly timeout?: number;
}

export interface IHttpResponse<T> {
    readonly data: T;
    readonly status: number;
    readonly statusText: string;
    readonly headers: AxiosHeaders;
}

export type IHttpError = {
    readonly type: typeof AXIOS_ERROR_HTTP;
    readonly status: number;
    readonly code?: string;
    readonly data: { error: boolean; message: string | string[] };
    readonly message?: unknown;
};
export interface INetworkError {
    readonly type: typeof AXIOS_ERROR_NETWORK;
    readonly message: string;
}

export interface IRequestError {
    readonly type: typeof AXIOS_ERROR_REQUEST;
    readonly message: string;
}

export interface IRequestUnknownError {
    readonly type: typeof AXIOS_ERROR_UNKNOWN;
    readonly message: string;
}

export interface IHttpClient {
    request<T>(config: IHttpRequestConfig): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    get<T, P>(url: string, params?: P): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    post<T, D>(url: string, data?: D): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    put<T, D>(url: string, data?: D): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    delete<T>(url: string): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
}

export type AxiosErrorType = INetworkError | IHttpError | IRequestError | IRequestUnknownError;

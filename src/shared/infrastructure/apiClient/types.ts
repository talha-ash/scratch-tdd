import type { AxiosHeaders } from 'axios';
import type { ResultAsync } from 'neverthrow';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type TypeOfAxiosError = 'network' | 'http' | 'request' | 'unknown';

export interface IHttpRequestConfig {
    readonly url: string;
    readonly method: HttpMethod;
    readonly headers?: Record<string, string>;
    readonly params?: Record<string, any>;
    readonly data?: any;
    readonly timeout?: number;
}

export interface IHttpResponse<T = any> {
    readonly data: T;
    readonly status: number;
    readonly statusText: string;
    readonly headers: AxiosHeaders;
}

export type IHttpError = {
    readonly type: 'http';
    readonly status: number;
    readonly code?: string;
    readonly data?: any;
    readonly message?: any;
};
export interface INetworkError {
    readonly type: 'network';
    readonly message: string;
}

export interface IRequestError {
    readonly type: 'request';
    readonly message: string;
}

export interface IRequestUnknownError {
    readonly type: 'unknown';
    readonly message: string;
}

export interface IHttpClient {
    request<T = any>(config: IHttpRequestConfig): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    get<T = any>(
        url: string,
        params?: Record<string, any>,
    ): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    post<T = any>(url: string, data?: any): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    put<T = any>(url: string, data?: any): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
    delete<T = any>(url: string): ResultAsync<IHttpResponse<T>, AxiosErrorType>;
}

export type AxiosErrorType = INetworkError | IHttpError | IRequestError | IRequestUnknownError;

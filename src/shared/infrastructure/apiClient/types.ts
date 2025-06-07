import type { AxiosHeaders } from 'axios';
import type { ResultAsync } from 'neverthrow';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type TypeOfAxiosError = 'network' | 'http' | 'request' | 'unknown';

export type HttpRequestConfig = {
    readonly url: string;
    readonly method: HttpMethod;
    readonly headers?: Record<string, string>;
    readonly params?: Record<string, any>;
    readonly data?: any;
    readonly timeout?: number;
};

export type HttpResponse<T = any> = {
    readonly data: T;
    readonly status: number;
    readonly statusText: string;
    readonly headers: AxiosHeaders;
};

export type HttpError = {
    readonly type: 'http';
    readonly status?: number;
    readonly code?: string;
    readonly data?: any;
    readonly message?: any;
};
export interface NetworkError {
    readonly type: 'network';
    readonly message: string;
}

export interface RequestError {
    readonly type: 'request';
    readonly message: string;
}

export interface RequestUnknownError {
    readonly type: 'unknown';
    readonly message: string;
}

export interface IHttpClient {
    request<T = any>(config: HttpRequestConfig): ResultAsync<HttpResponse<T>, AxiosErrorType>;
    get<T = any>(
        url: string,
        params?: Record<string, any>,
    ): ResultAsync<HttpResponse<T>, AxiosErrorType>;
    post<T = any>(url: string, data?: any): ResultAsync<HttpResponse<T>, AxiosErrorType>;
    put<T = any>(url: string, data?: any): ResultAsync<HttpResponse<T>, AxiosErrorType>;
    delete<T = any>(url: string): ResultAsync<HttpResponse<T>, AxiosErrorType>;
}

export type AxiosErrorType = NetworkError | HttpError | RequestError | RequestUnknownError;

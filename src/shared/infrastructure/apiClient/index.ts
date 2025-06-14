/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    AxiosHeaders,
    isAxiosError,
} from 'axios';
import type {
    IHttpClient,
    IHttpRequestConfig,
    IHttpError,
    IHttpResponse,
    AxiosErrorType,
    INetworkError,
    IRequestError,
    IRequestUnknownError,
} from './types';
import { err, ok, ResultAsync } from 'neverthrow';
import {
    AXIOS_ERROR_HTTP,
    AXIOS_ERROR_NETWORK,
    AXIOS_ERROR_REQUEST,
    AXIOS_ERROR_UNKOWN,
} from './constants';

export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: defaultHeaders,
        });
    }

    request<T = any>(config: IHttpRequestConfig): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        const axiosConfig: AxiosRequestConfig = {
            url: config.url,
            method: config.method,
            headers: config.headers,
            params: config.params,
            data: config.data,
            timeout: config.timeout,
        };

        const response = ResultAsync.fromPromise(this.axiosInstance.request(axiosConfig), (err) => {
            if (isAxiosError(err)) {
                if (err.response) {
                    return {
                        type: AXIOS_ERROR_HTTP,
                        status: err.response.status,
                        code: err.code,
                        data: convertNestedErrorMessage(err.response.data.data.message),
                        message: err.message,
                    } as IHttpError;
                } else if (err.request) {
                    return {
                        type: AXIOS_ERROR_NETWORK,
                        message: err.message,
                        code: err.code,
                    } as INetworkError;
                } else {
                    return {
                        type: AXIOS_ERROR_REQUEST,
                        message: err.message,
                        code: err.code,
                    } as IRequestError;
                }
            } else {
                return {
                    type: AXIOS_ERROR_UNKOWN,
                    message: err instanceof Error ? err.message : 'Unknown error',
                } as IRequestUnknownError;
            }
        });

        return response.andThen((resp) => {
            if (resp.status >= 200 && resp.status < 300) {
                return ok({
                    ...resp.data,
                    status: resp.status,
                    statusText: resp.statusText,
                    headers: resp.headers as AxiosHeaders,
                });
            }
            return err({
                type: 'unknown',
                message: err instanceof Error ? err.message : 'Unknown error',
            } as IRequestUnknownError);
        });
    }

    get<T, P>(url: string, params?: P): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'GET', params: params ? params : {} });
    }

    post<T, D>(url: string, data?: D): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'POST', data });
    }

    put<T, D>(url: string, data?: D): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'PUT', data });
    }

    delete<T>(url: string): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'DELETE' });
    }
}

export function apiClientFactory(baseUrl: string, defaultHeaders?: Record<string, string>) {
    return new AxiosHttpClient(baseUrl, defaultHeaders);
}

export function convertNestedErrorMessage(message: string | { errors: Record<string, string[]> }) {
    if (typeof message === 'string') {
        return { error: true, message };
    }

    const result: string[] = [];

    Object.keys(message.errors).map((key) => {
        const errorValue = message.errors[key];
        result.push(...errorValue);
    });

    return { error: true, message: result };
}

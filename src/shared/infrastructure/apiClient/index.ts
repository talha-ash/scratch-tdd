/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    AxiosError,
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
import { err, ok, Ok, ResultAsync } from 'neverthrow';

export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, defaultHeaders?: Record<string, string>) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: defaultHeaders,
            // Minimal config - let React Query handle retries, timeouts, etc.
        });
    }

    // Main request method
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
                        type: 'http',
                        status: err.response.status,
                        code: err.code,
                        data: err.response.data,
                        message: err.message,
                    } as IHttpError;
                } else if (err.request) {
                    return {
                        type: 'network',
                        message: err.message,
                        code: err.code,
                    } as INetworkError;
                } else {
                    return {
                        type: 'request',
                        message: err.message,
                        code: err.code,
                    } as IRequestError;
                }
            } else {
                return {
                    type: 'unknown',
                    message: err instanceof Error ? err.message : 'Unknown error',
                } as IRequestUnknownError;
            }
        });

        return response.andThen((resp) => {
            if (resp.status >= 200 && resp.status < 300) {
                return ok({
                    data: resp.data,
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

    // Convenience methods
    get<T = any>(
        url: string,
        params?: Record<string, any>,
    ): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'GET', params });
    }

    post<T = any>(url: string, data?: any): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'POST', data });
    }

    put<T = any>(url: string, data?: any): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'PUT', data });
    }

    delete<T = any>(url: string): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        return this.request<T>({ url, method: 'DELETE' });
    }
}

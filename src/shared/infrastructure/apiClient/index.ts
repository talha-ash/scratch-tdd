/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
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
import { err, ok, Result, ResultAsync } from 'neverthrow';
import {
    AXIOS_ERROR_HTTP,
    AXIOS_ERROR_NETWORK,
    AXIOS_ERROR_REQUEST,
    AXIOS_ERROR_UNKOWN,
} from './constants';

type RefreshPromiseResolveType = Result<{ index: number }, { index: number }>;

type getTokenType = () => string | null;
type setTokenType = (token: string) => void;
export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;
    private refreshingToken: boolean;
    private requestPauser: () => Promise<RefreshPromiseResolveType>;

    constructor(
        baseURL: string,
        private getToken: getTokenType,
        private setToken: setTokenType,
        defaultHeaders?: Record<string, string>,
    ) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: defaultHeaders,
            withCredentials: true,
        });
        this.refreshingToken = false;
        this.requestPauser = this.pauser();
        this.setInterceptor();
    }

    pauser() {
        const resolverQueue: Array<(value: RefreshPromiseResolveType) => void> = [];
        let calledTime = 0;
        return async () => {
            calledTime = calledTime + 1;
            const promise = new Promise<RefreshPromiseResolveType>((res) => {
                resolverQueue.push(res);
            });

            if (calledTime == 1) {
                this.axiosInstance
                    .get(`refresh_token`)
                    .then(({ data }) => {
                        this.setToken(data.data.token);
                        this.refreshingToken = false;
                        calledTime = 0;
                        resolverQueue.forEach((res, index) => res(ok({ index })));
                    })
                    .catch(() => {
                        this.refreshingToken = false;
                        calledTime = 0;
                        resolverQueue.forEach((res, index) => res(err({ index })));
                    });
            }

            return promise;
        };
    }

    configRequest(config: InternalAxiosRequestConfig<any>) {
        const accessToken = this.getToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
    setInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const isTokenRefreshRequest = config.url?.includes('refresh_token');
                if (isTokenRefreshRequest) {
                    return config;
                }
                const controller = new AbortController();
                if (this.refreshingToken) {
                    const result = await this.requestPauser();

                    if (result.isOk()) {
                        config = this.configRequest(config);
                        return config;
                    } else {
                        controller.abort();
                        return {
                            ...config,
                            signal: controller.signal,
                        };
                    }
                }
                config = this.configRequest(config);
                return {
                    ...config,
                    signal: controller.signal,
                };
            },
            function (error) {
                // Do something with request error
                return Promise.reject(error);
            },
        );

        // Add a response interceptor
        this.axiosInstance.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                if (error.status == 401) {
                    this.refreshingToken = true;
                    const result = await this.requestPauser();

                    if (result.isOk()) {
                        const config = this.configRequest(error.config);
                        const result = await this.axiosInstance.request(config);
                        this.refreshingToken = false;
                        return Promise.resolve(result);
                    } else {
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            },
        );
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

export function apiClientFactory(
    baseUrl: string,
    getToken: getTokenType,
    setToken: setTokenType,
    defaultHeaders?: Record<string, string>,
) {
    return new AxiosHttpClient(baseUrl, getToken, setToken, defaultHeaders);
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

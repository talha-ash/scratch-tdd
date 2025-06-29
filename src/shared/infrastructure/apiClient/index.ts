import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
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
import type { User } from '~/contexts/auth/domain/user';

type RefreshPromiseResolveType = Result<{ index: number }, { index: number }>;

type getTokenType = () => string | null;
type setTokenAndUserType = (token: string, user: User) => void;
export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;
    private refreshingToken: boolean;
    private resolverQueue: Array<(value: RefreshPromiseResolveType) => void>;
    private calledTime: number;
    public refreshEndpoint: string;

    constructor(
        baseURL: string,
        refreshEndpoint: string,
        private getToken: getTokenType,
        private setTokenAndUser: setTokenAndUserType,
        defaultHeaders?: Record<string, string>,
    ) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: defaultHeaders,
            withCredentials: true,
        });
        this.refreshingToken = false;
        this.refreshEndpoint = refreshEndpoint;
        this.resolverQueue = [];
        this.calledTime = 0;
        this.setInterceptor();
    }

    private async waitForRefresh() {
        this.calledTime = this.calledTime + 1;
        const promise = new Promise<RefreshPromiseResolveType>((res) => {
            this.resolverQueue.push(res);
        });

        if (this.calledTime == 1) {
            this.performRefresh();
        }

        return promise;
    }

    private async performRefresh() {
        try {
            const { data } = await this.axiosInstance.get(this.refreshEndpoint);
            this.setTokenAndUser(data.data.token, data.data.user);
            this.resetTokenRefreshState();
            this.resolveQueueWithOk();
        } catch {
            this.resetTokenRefreshState();
            this.resolveQueueWithError();
        }
    }

    private resetTokenRefreshState(): void {
        this.refreshingToken = false;
        this.calledTime = 0;
    }

    private resolveQueueWithOk(): void {
        this.resolverQueue.forEach((res, index) => res(ok({ index })));
        this.resolverQueue = [];
    }

    private resolveQueueWithError(): void {
        this.resolverQueue.forEach((res, index) => res(err({ index })));
        this.resolverQueue = [];
    }

    private addAuthHeader(config: InternalAxiosRequestConfig<unknown>) {
        const accessToken = this.getToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }

    private setInterceptor() {
        this.setRequestInterceptor();
        this.setResponseInterceptor();
    }

    private setRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                const isTokenRefreshRequest = config.url?.includes(this.refreshEndpoint);
                if (isTokenRefreshRequest) {
                    return config;
                }
                const controller = new AbortController();
                if (this.refreshingToken) {
                    const result = await this.waitForRefresh();

                    if (result.isOk()) {
                        config = this.addAuthHeader(config);
                        return config;
                    } else {
                        controller.abort();
                        return {
                            ...config,
                            signal: controller.signal,
                        };
                    }
                }
                config = this.addAuthHeader(config);
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
    }

    private setResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error) => {
                if (error.status == 401) {
                    //we required this condition to prevent pauser loop.
                    //it return reject promise.so the pauser release all resolver with rejection
                    const isTokenRefreshRequest = error.config.url?.includes(this.refreshEndpoint);
                    if (isTokenRefreshRequest) {
                        return Promise.reject(error);
                    }
                    this.refreshingToken = true;
                    const result = await this.waitForRefresh();

                    if (result.isOk()) {
                        this.refreshingToken = false;
                        const config = this.addAuthHeader(error.config);
                        const result = await this.axiosInstance.request(config);
                        return Promise.resolve(result);
                    } else {
                        //so refresh token expire too
                        error.message = this.refreshEndpoint;
                        return Promise.reject(error);
                    }
                }

                return Promise.reject(error);
            },
        );
    }

    private handleSuccessResponse<T = never>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        resp: AxiosResponse<any, any>,
    ): Result<IHttpResponse<T>, AxiosErrorType> {
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
    }

    private handleError(error: unknown): AxiosErrorType {
        if (isAxiosError(error)) {
            if (error.message == this.refreshEndpoint) {
                return {
                    type: AXIOS_ERROR_HTTP,
                    status: error.response?.status,
                    code: error.code,
                    message: error.message,
                } as IHttpError;
            }
            if (error.response) {
                return {
                    type: AXIOS_ERROR_HTTP,
                    status: error.response.status,
                    code: error.code,
                    data: convertNestedErrorMessage(error.response.data.data.message),
                    message: error.message,
                } as IHttpError;
            } else if (error.request) {
                return {
                    type: AXIOS_ERROR_NETWORK,
                    message: error.message,
                    code: error.code,
                } as INetworkError;
            } else {
                return {
                    type: AXIOS_ERROR_REQUEST,
                    message: error.message,
                    code: error.code,
                } as IRequestError;
            }
        } else {
            return {
                type: AXIOS_ERROR_UNKOWN,
                message: error instanceof Error ? error.message : 'Unknown error',
            } as IRequestUnknownError;
        }
    }

    request<T>(config: IHttpRequestConfig): ResultAsync<IHttpResponse<T>, AxiosErrorType> {
        const axiosConfig: AxiosRequestConfig = {
            url: config.url,
            method: config.method,
            headers: config.headers,
            params: config.params,
            data: config.data,
            timeout: config.timeout,
        };

        const response = ResultAsync.fromPromise(this.axiosInstance.request(axiosConfig), (err) => {
            return this.handleError(err);
        });

        return response.andThen((resp) => {
            return this.handleSuccessResponse(resp);
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

export function apiClientFactory({
    baseUrl,
    refreshEndpoint,
    getToken,
    setTokenAndUser,
    defaultHeaders = undefined,
}: {
    baseUrl: string;
    refreshEndpoint: string;
    getToken: getTokenType;
    setTokenAndUser: setTokenAndUserType;
    defaultHeaders?: Record<string, string>;
}) {
    return new AxiosHttpClient(baseUrl, refreshEndpoint, getToken, setTokenAndUser, defaultHeaders);
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

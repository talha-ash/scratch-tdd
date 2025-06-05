/* eslint-disable @typescript-eslint/no-explicit-any */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

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
    readonly headers: Record<string, string>;
};

export type HttpError = {
    readonly message: string;
    readonly status?: number;
    readonly statusText?: string;
    readonly code?: string;
    readonly data?: any;
};

export type HttpResult<T> =
    | { readonly success: true; readonly response: HttpResponse<T> }
    | { readonly success: false; readonly error: HttpError };

// Abstract interface - can be implemented by any HTTP library
export interface IHttpClient {
    request<T = any>(config: HttpRequestConfig): Promise<HttpResult<T>>;
    get<T = any>(url: string, params?: Record<string, any>): Promise<HttpResult<T>>;
    post<T = any>(url: string, data?: any): Promise<HttpResult<T>>;
    put<T = any>(url: string, data?: any): Promise<HttpResult<T>>;
    delete<T = any>(url: string): Promise<HttpResult<T>>;
}

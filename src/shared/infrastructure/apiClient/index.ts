/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance, type AxiosRequestConfig, AxiosError } from 'axios';
import {
    type IHttpClient,
    type HttpRequestConfig,
    type HttpResult,
    type HttpError,
    type HttpResponse,
} from './types';

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
    async request<T = any>(config: HttpRequestConfig): Promise<HttpResult<T>> {
        try {
            const axiosConfig: AxiosRequestConfig = {
                url: config.url,
                method: config.method,
                headers: config.headers,
                params: config.params,
                data: config.data,
                timeout: config.timeout,
            };

            const response = await this.axiosInstance.request(axiosConfig);

            return {
                success: true,
                response: this.normalizeResponse<T>(response),
            };
        } catch (error) {
            return {
                success: false,
                error: this.normalizeError(error),
            };
        }
    }

    // Convenience methods
    async get<T = any>(url: string, params?: Record<string, any>): Promise<HttpResult<T>> {
        return this.request<T>({ url, method: 'GET', params });
    }

    async post<T = any>(url: string, data?: any): Promise<HttpResult<T>> {
        return this.request<T>({ url, method: 'POST', data });
    }

    async put<T = any>(url: string, data?: any): Promise<HttpResult<T>> {
        return this.request<T>({ url, method: 'PUT', data });
    }

    async delete<T = any>(url: string): Promise<HttpResult<T>> {
        return this.request<T>({ url, method: 'DELETE' });
    }

    private normalizeResponse<T>(axiosResponse: any): HttpResponse<T> {
        return {
            data: axiosResponse.data,
            status: axiosResponse.status,
            statusText: axiosResponse.statusText,
            headers: axiosResponse.headers || {},
        };
    }

    
    private normalizeError(error: any): HttpError {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            return {
                message: axiosError.message,
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                code: axiosError.code,
                data: axiosError.response?.data,
            };
        }

        return {
            message: error.message || 'Unknown error occurred',
            code: 'UNKNOWN_ERROR',
        };
    }
}

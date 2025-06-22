import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { AxiosHttpClient, convertNestedErrorMessage } from '..';
import { BASE_URL } from '~/shared/constants';
import axios, { type AxiosInstance } from 'axios';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, { deep: true });

describe('Axios Api Client', () => {
    let httpClient: AxiosHttpClient;
    let mockGetToken: ReturnType<typeof vi.fn>;
    let mockSetToken: ReturnType<typeof vi.fn>;
    let mockAxiosInstance = vi.mocked({
        get: vi.fn(),
        request: vi.fn(),
        interceptors: {
            request: {
                use: vi.fn(),
                eject: vi.fn(),
                clear: vi.fn(),
            },
            response: {
                use: vi.fn(),
                eject: vi.fn(),
                clear: vi.fn(),
            },
        },
    });

    const refreshEndpoint = '/refresh_token';

    beforeEach(() => {
        mockGetToken = vi.fn();
        mockSetToken = vi.fn();

        mockAxiosInstance = {
            get: vi.fn(),
            request: vi.fn(),
            interceptors: {
                request: {
                    use: vi.fn(),
                    eject: vi.fn(),
                    clear: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                    eject: vi.fn(),
                    clear: vi.fn(),
                },
            },
        };

        mockedAxios.create.mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);
        httpClient = new AxiosHttpClient(BASE_URL, refreshEndpoint, mockGetToken, mockSetToken);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('Axios Instance Initialization', () => {
        it('axios instance create with correct configs', () => {
            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: BASE_URL,
                headers: undefined,
                withCredentials: true,
            });
        });

        it('axios instance created with custome headers', () => {
            const customeHeader = {
                'Content-Type': 'application/json',
            };
            new AxiosHttpClient(
                BASE_URL,
                refreshEndpoint,
                mockGetToken,
                mockSetToken,
                customeHeader,
            );

            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: BASE_URL,
                headers: customeHeader,
                withCredentials: true,
            });
        });

        it('should set interceptor', () => {
            expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
            expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
        });
    });

    describe('Api Client Http Methods', () => {
        beforeEach(() => {
            mockAxiosInstance.request.mockResolvedValue({
                data: { success: true },
                status: 200,
                statusText: 'OK',
                headers: {},
            });
        });
        it('get method success', async () => {
            const url = `/posts/1`;
            const result = await httpClient.get('/posts/1');

            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
                url: url,
                method: 'GET',
                headers: undefined,
                params: {},
                data: undefined,
                timeout: undefined,
            });

            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
                expect(result.value.status).toBe(200);
            }
        });
        it('post method success', async () => {
            const url = `/posts`;
            const data = { title: 'Post Title', description: 'It is great post' };
            const result = await httpClient.post('/posts', data);

            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
                url: url,
                method: 'POST',
                headers: undefined,
                params: undefined,
                data: data,
                timeout: undefined,
            });

            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
                expect(result.value.status).toBe(200);
            }
        });
        it('put method success', async () => {
            const url = `/posts/1`;
            const data = { title: 'Post Title', description: 'It is great post' };
            const result = await httpClient.put('/posts/1', data);

            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
                url: url,
                method: 'PUT',
                headers: undefined,
                params: undefined,
                data: data,
                timeout: undefined,
            });

            expect(result.isOk()).toBe(true);
            
        });
        it('delete method success', async () => {
            const url = `/posts/1`;
            const result = await httpClient.delete('/posts/1');

            expect(mockAxiosInstance.request).toHaveBeenCalledWith({
                url: url,
                method: 'DELETE',
                headers: undefined,
                params: undefined,
                data: undefined,
                timeout: undefined,
            });

            expect(result.isOk()).toBe(true);
        });
    });
});

describe('http error conversion', () => {
    it('convert successfully', () => {
        const message = 'User Not Found';

        const result = convertNestedErrorMessage(message);

        expect(result.message).toEqual(message);
    });

    it('convert successfully nested errors', () => {
        const message = {
            errors: { email: ['User Not Found'], password: ['Password is not good'] },
        };

        const result = convertNestedErrorMessage(message);

        expect(result.message).toEqual(['User Not Found', 'Password is not good']);
    });
});

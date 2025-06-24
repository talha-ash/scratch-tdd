import axios, { type AxiosInstance } from 'axios';
import { setupServer } from 'msw/node';
import { ResultAsync } from 'neverthrow';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { BASE_URL } from '~/shared/constants';
import { apiClientFactory, type AxiosHttpClient, convertNestedErrorMessage } from '..';
import { apiResponseFixtures } from './mocks/apiFixtures';
import { handlers } from './mocks/handlers';

vi.mock('axios', { spy: true });
const mockedAxios = vi.mocked(axios, { deep: true });
export type MockedAxios = typeof mockedAxios;
describe('Axios Api Client', () => {
    describe('With Mocked Axios', () => {
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

        // afterAll(() => {
        //     vi.doUnmock('axios');
        // });
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
            httpClient = apiClientFactory(BASE_URL, refreshEndpoint, mockGetToken, mockSetToken);
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
                apiClientFactory(
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
                    statusText: 'OkK',
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

        describe('Error Handling', () => {
            it('should handle HTTP errors correctly', async () => {
                const validationError = apiResponseFixtures.httpError.validationFailled;
                mockAxiosInstance.request.mockRejectedValue(validationError);

                const result = await httpClient.get('/test');

                expect(result.isErr()).toBe(true);
                if (result.isErr() && result.error.type == 'http') {
                    expect(result.error.type).toBe('http');
                    expect(result.error.status).toBe(validationError.response?.status);
                    expect(result.error.data.message).toBe(
                        validationError.response?.data.data.message,
                    );
                }
            });
        });
        it('should handle unknown errors correctly', async () => {
            const unknownError = new Error('Unknown error');

            mockAxiosInstance.request.mockRejectedValue(unknownError);

            const result = await httpClient.get('/test');

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error.type).toBe('unknown');
            }
        });

        it('should handle network errors correctly', async () => {
            mockAxiosInstance.request.mockRejectedValue(
                apiResponseFixtures.httpError.networkFailed,
            );

            const result = await httpClient.get('/test');

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error.type).toBe('network');
            }
        });

        it('should handle invalid request errors correctly', async () => {
            mockAxiosInstance.request.mockRejectedValue(
                apiResponseFixtures.httpError.requestFailed,
            );

            const result = await httpClient.get('/test');

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error.type).toBe('request');
            }
        });
    });

    describe('Token managment', () => {
        const server = setupServer(...handlers);
        let httpClient: AxiosHttpClient;
        let mockGetToken: ReturnType<typeof vi.fn>;
        let mockSetToken: ReturnType<typeof vi.fn>;
        const refreshEndpoint = 'refresh_token';

        // Start server before all tests
        beforeAll(async () => {
            vi.clearAllMocks();
            server.listen({ onUnhandledRequest: 'error' });
        });
        beforeEach(async () => {
            mockGetToken = vi.fn();
            mockSetToken = vi.fn((token: string) => mockGetToken.mockReturnValue(token));

            httpClient = await apiClientWithNewAxiosInstance(
                mockedAxios,
                refreshEndpoint,
                mockGetToken,
                mockSetToken,
            );
        });
        // Close server after all tests
        afterAll(() => {
            server.close();
        });

        // Reset handlers after each test for test isolation
        afterEach(() => {
            vi.clearAllMocks();
            server.resetHandlers();
        });

        it('get token called', async () => {
            await httpClient.get('users');
            expect(mockGetToken).toHaveBeenCalled();
        });

        it('request sent with token', async () => {
            mockGetToken.mockReturnValue(apiResponseFixtures.initialToken);
            const result = await httpClient.get('auth/posts/1');

            if (result.isOk()) {
                expect(result.value.data).toEqual(apiResponseFixtures.post.data);
            }
        });
        it('request sent with token', async () => {
            mockGetToken.mockReturnValue(apiResponseFixtures.initialToken);
            const result = await httpClient.get('auth/posts/1');

            if (result.isOk()) {
                expect(result.value.data).toEqual(apiResponseFixtures.post.data);
            }
        });
        it('token expire and get new token by refresh flow', async () => {
            mockGetToken.mockReturnValue(apiResponseFixtures.expireAccessToken);
            const result = await httpClient.get('auth/posts/1');

            expect(result.isOk()).toBe(true);
            if (result.isOk()) {
                expect(result.value.data).toEqual(apiResponseFixtures.post.data);
            }
            expect(mockGetToken()).toBe(apiResponseFixtures.newToken);
        });

        it('Request queue resolved after token expire and get new token by refresh flow', async () => {
            mockGetToken.mockReturnValue(apiResponseFixtures.initialToken);
            const result = await ResultAsync.fromPromise(
                Promise.all([
                    httpClient.get('auth/posts/1'),
                    httpClient.get('auth/posts/1'),
                    httpClient.get('auth/posts/1'),
                    httpClient.get('auth/posts/1'),
                ]),
                () => new Error('Request failed'),
            );

            expect(result.isOk()).toBe(true);
            result.map((responses) => {
                responses.map((response) => {
                    expect(response.isOk()).toBe(true);
                    if (response.isOk()) {
                        expect(response.value.data).toEqual(apiResponseFixtures.post.data);
                    }
                });
            });

            // expect(mockGetToken()).toBe('new-access-token');
        });

        it('refresh token expire', async () => {
            httpClient = await apiClientWithNewAxiosInstance(
                mockedAxios,
                'refresh_token_expired',
                mockGetToken,
                mockSetToken,
            );
            mockGetToken.mockReturnValue(apiResponseFixtures.expireAccessToken);
            const result = await httpClient.get('auth/posts/1');

            expect(result.isErr()).toBe(true);
            if (result.isErr()) {
                expect(result.error.message).toEqual('refresh_token_expired');
            }
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

async function apiClientWithNewAxiosInstance(
    mockedAxios: MockedAxios,
    refreshEndpoint: string,
    mockGetToken: ReturnType<typeof vi.fn>,
    mockSetToken: ReturnType<typeof vi.fn>,
) {
    const originalModule = (await vi.importActual('axios')) as AxiosInstance;

    //we have to mock here to use actual axios and create new axios instance
    //so that when httpClient call create it get actual axios rather than mocked one
    mockedAxios.create.mockReturnValue(
        originalModule.create({
            baseURL: BASE_URL,
            withCredentials: true,
        }),
    );
    return apiClientFactory(BASE_URL, refreshEndpoint, mockGetToken, mockSetToken);
}

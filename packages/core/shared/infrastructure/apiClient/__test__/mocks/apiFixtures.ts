import { AxiosError, type AxiosResponse } from 'axios';

const newToken = 'new-access-token';
const initialToken = 'access-token';
const expireAccessToken = 'access-token-expire';

const config = {
    method: 'get',
    url: '/api/endpoint',
    headers: {
        'Content-Type': 'application/json',
    },
};
export const apiResponseFixtures = {
    users: {
        data: [
            {
                id: 'abc-123',
                firstName: 'John',
                lastName: 'Maverick',
            },
        ],
    },
    posts: {
        data: [
            {
                id: 'abc-123',
                title: 'Hello World',
            },
        ],
    },
    post: {
        data: {
            id: 'abc-123',
            title: 'Hello World',
        },
    },
    newToken: newToken,
    initialToken: initialToken,
    expireAccessToken: expireAccessToken,
    auth: {
        refreshToken: {
            data: { token: newToken },
        },
        unauthorized: {
            message: 'Unauthorized',
        },
        refreshTokenExpire: {
            message: 'refresh token expired',
        },
    },
    httpError: {
        validationFailled: new AxiosError(
            'Request failed with status code 400',
            'ERR_BAD_REQUEST',
            undefined,
            null, // request
            {
                status: 400,
                statusText: 'Bad Request',
                data: {
                    data: {
                        message: 'validation failed',
                    },
                },
                headers: {
                    'content-type': 'application/json',
                },
                config: config,
            } as unknown as AxiosResponse,
        ),
        networkFailed: new AxiosError(
            'Network Error',
            'ERR_NETWORK',
            undefined,
            {
                status: '',
            }, // request
        ),
        requestFailed: new AxiosError('Invalid URL', 'ERR_INVALID_URL'),
    },
};

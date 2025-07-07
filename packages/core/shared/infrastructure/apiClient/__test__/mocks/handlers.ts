import { http, HttpResponse } from 'msw';
import { BASE_URL } from '~shared/constants';
import { apiResponseFixtures } from './apiFixtures';

export const handlers = [
    http.get(`${BASE_URL}users`, () => {
        return HttpResponse.json({
            data: apiResponseFixtures.users.data,
        });
    }),
    http.get(`${BASE_URL}auth/posts/1`, ({ request }) => {
        const authHeader = request.headers.get('authorization');
        if (
            authHeader === `Bearer ${apiResponseFixtures.initialToken}` ||
            authHeader === `Bearer ${apiResponseFixtures.newToken}`
        ) {
            return HttpResponse.json(
                {
                    data: apiResponseFixtures.post.data,
                },
                { status: 200 },
            );
        }
        return HttpResponse.json(apiResponseFixtures.auth.unauthorized, { status: 401 });
    }),

    http.get(`${BASE_URL}refresh_token`, () => {
        return HttpResponse.json({
            data: apiResponseFixtures.auth.refreshToken.data,
        });
    }),

    http.get(`${BASE_URL}refresh_token_expired`, () => {
        return HttpResponse.json(apiResponseFixtures.auth.refreshTokenExpire, { status: 401 });
    }),
];

import { http, HttpResponse } from 'msw';
import { BASE_URL } from '~/shared/constants';

export const handlers = [
    http.get(`${BASE_URL}users`, () => {
        return HttpResponse.json({
            data: [
                {
                    id: 'abc-123',
                    firstName: 'John',
                    lastName: 'Maverick',
                },
            ],
        });
    }),
    http.get(`${BASE_URL}auth/posts/1`, ({ request }) => {
        const authHeader = request.headers.get('authorization');
        if (authHeader === 'Bearer access-token' || authHeader === 'Bearer new-access-token') {
            return HttpResponse.json(
                {
                    data: [
                        {
                            id: 'abc-123',
                            title: 'Hello World',
                        },
                    ],
                },
                { status: 200 },
            );
        }
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }),
    
    http.get(`${BASE_URL}refresh_token`, () => {
        return HttpResponse.json({
            data: { token: 'new-access-token' },
        });
    }),

    http.get(`${BASE_URL}refresh_token_expired`, () => {
        return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }),
];

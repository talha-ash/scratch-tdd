import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { err, Err, ok, Ok, Result, ResultAsync } from 'neverthrow';
import { AxiosHttpClient } from '~/shared/infrastructure/apiClient';
import type { AxiosErrorType, HttpResponse } from '~/shared/infrastructure/apiClient/types';

export const Route = createFileRoute('/')({
    component: Index,
});

interface NetworkError {
    type: 'network';
    error: Error;
    isError: true;
}

interface User {
    type: 'network';
    error: Error;
    isError: true;
}

function Index() {
    const query = useQuery<User[], AxiosErrorType>({
        queryKey: ['test'],
        retry: false,
        queryFn: async () => {
            const users = await getUsers();

            if (users.isOk()) {
                return users.value.data;
            } else {
                return Promise.reject(users.error);
            }
        }, // either data, err
        // queryFn: async () => await getUsers(),all as data either ok, err
    });
    
    if (query.error) {
        console.log(query.error);
    }
    if (query.data) {
        const result = query.data;
        console.log(result);
    }

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Button>Hello World</Button>
        </div>
    );
}

function getUsers(): ResultAsync<HttpResponse<User[]>, AxiosErrorType> {
    const apiClient = new AxiosHttpClient('https://jsonplaceholder.typicode.com');

    return apiClient.get<User[]>('/userss');
}

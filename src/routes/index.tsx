import { createFileRoute } from '@tanstack/react-router';

import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { authStore } from '~/contexts/auth/authStore';
import { BASE_URL } from '~/shared/constants';
import { apiClient } from '~/shared/infrastructure';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

export const Route = createFileRoute('/')({
    component: Index,
});

function Index() {
    const { successToast } = useToastNotification();
    const state = authStore.useAuthStore(state => state);
    useEffect(() => {
        successToast('Welcome to the home page!');
    }, []);

    const fetchUser = async () => {
        const users = await apiClient.get(`${BASE_URL}users`);
        console.log(users);
    };

    const temperToken = () => {
        state.setAccessToken((state.data.accessToken ?? 'sdsdsd') + 1212121212);
    };

    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Button>Hello World</Button>
            <Button onClick={fetchUser}>Fetch Users</Button>
            <Button onClick={temperToken}>Tamper Token</Button>
            <Button>Hello World</Button>
        </div>
    );
}

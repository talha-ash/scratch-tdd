import { createFileRoute } from '@tanstack/react-router';

import { useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { AuthContext, CoreShared } from 'core';

export const Route = createFileRoute('/_app/')({
    component: Index,
});

function Index() {
    const { successToast } = useToastNotification();
    const state = CoreShared.tokenStore.useTokenStore((state) => state);
    const user = AuthContext.AuthStore.authStore.useAuthStore(
        AuthContext.AuthStore.authStore.userSelector,
    );

    useEffect(() => {
        successToast('Welcome to the home page!');
    }, []);

    const fetchUser = async () => {
        const users = await CoreShared.apiClient.get(`${CoreShared.BASE_URL}users`);
        console.log(users);
    };

    const temperToken = () => {
        state.setAccessToken((state.accessToken ?? 'sdsdsd') + 1212121212);
    };

    console.log(user);
    return (
        <div className="p-2">
            <h3>Welcome Home! {user?.username}</h3>
            <Button>Hello World</Button>
            <Button onClick={fetchUser}>Fetch Users</Button>
            <Button onClick={temperToken}>Tamper Token</Button>
            <Button>Hello World</Button>
        </div>
    );
}

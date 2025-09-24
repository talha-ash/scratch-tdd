import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { AuthContext, CoreShared } from 'core';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/_app/')({
    component: Index,
});

function Index() {
    const navigate = useNavigate();
    const tokenState = CoreShared.tokenStore.useTokenStore((state) => state);
    const user = AuthContext.AuthStore.authStore.useAuthStore(
        AuthContext.AuthStore.authStore.userSelector,
    );

    const fetchUser = async () => {
        const users = await CoreShared.apiClient.get(`${CoreShared.BASE_URL}users`);
        console.log(users);
    };

    const temperToken = () => {
        tokenState.setAccessToken((tokenState.accessToken ?? 'sdsdsd') + 1212121212);
    };

    const createIngredient = async () => {
        navigate({ to: 'createIngredient' });
    };

    return (
        <div className="p-2">
            <h3>Welcome Home! {user.username}</h3>
            <Button>Hello World</Button>
            <Button onClick={createIngredient}>Create Ingredient</Button>
            <Button onClick={fetchUser}>Fetch Users</Button>
            <Button onClick={temperToken}>Tamper Token</Button>
            <Button>Hello World</Button>
        </div>
    );
}

import '../app.css';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useToastNotification } from '~/shared/infrastructure/toast';

export const Route = createRootRoute({
    component: () => {
        const { Toaster } = useToastNotification();
        return (
            <>
                <Outlet />
                <Toaster />
                <TanStackRouterDevtools />
            </>
        );
    },
});

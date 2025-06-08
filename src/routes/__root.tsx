import '../app.css';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';


export const Route = createRootRoute({
    component: () => {        
        return (
            <>
                <Outlet />
                <Toaster />
                <TanStackRouterDevtools />
            </>
        );
    },
});

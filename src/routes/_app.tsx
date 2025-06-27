import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
    component: RouteComponent,
    beforeLoad: ({ context, location }) => {
        console.log(location);
        if (!context.auth?.data.accessToken) {
            throw redirect({
                to: '/login',
            });
        }
    },
});

function RouteComponent() {
    return (
        <>
            <Outlet />
        </>
    );
}

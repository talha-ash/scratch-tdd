import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
    component: RouteComponent,
    beforeLoad: ({ context, location }) => {
        console.log(location);
        if (!context.authToken?.accessToken) {
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

import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '~/contexts/auth/useCases/login/components/loginForm';

export const Route = createFileRoute('/_auth/login')({
    component: LoginPageComponent,
});

export function LoginPageComponent() {
    const query = useQuery({
        queryKey: ['ll'],
        queryFn: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('Hello World');
                }, 1000);
            });
        },
    });
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <LoginForm />
        </div>
    );
}

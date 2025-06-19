import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '~/contexts/auth/useCases/login/components/loginForm';


export const Route = createFileRoute('/_auth/login')({
    component: LoginPageComponent,
});

export function LoginPageComponent() {
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <LoginForm />
        </div>
    );
}

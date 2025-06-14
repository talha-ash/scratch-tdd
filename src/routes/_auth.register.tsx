import { createFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '~/contexts/auth/components/registerForm';

export const Route = createFileRoute('/_auth/register')({
    component: RegisterPageComponent,
});

export function RegisterPageComponent() {
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <RegisterForm />
        </div>
    );
}

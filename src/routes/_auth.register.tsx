import { createFileRoute, redirect } from '@tanstack/react-router';
import { authStore } from '~/contexts/auth/useCases/login/authStore';
import { RegisterForm } from '~/contexts/auth/useCases/registeration/components/registerForm';

export const Route = createFileRoute('/_auth/register')({
    component: RegisterPageComponent,
    beforeLoad: async () => {
        const accessToken = authStore.useAuthStore.getState().data.accessToken;        
        if (accessToken) {
            throw redirect({ to: '/' });
        }
    },
});

export function RegisterPageComponent() {
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <RegisterForm />
        </div>
    );
}

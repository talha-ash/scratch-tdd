import { createFileRoute, redirect } from '@tanstack/react-router';
import { authStore } from '~/contexts/auth/useCases/login/authStore';
import { LoginForm } from '~/contexts/auth/useCases/login/components/loginForm';


export const Route = createFileRoute('/_auth/login')({
    component: LoginPageComponent,
     beforeLoad: async () => {
            const accessToken = authStore.useAuthStore.getState().data.accessToken;            
            if (accessToken) {
                throw redirect({ to: '/' });
            }
        },
});

export function LoginPageComponent() {    
    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
            <LoginForm />
        </div>
    );
}

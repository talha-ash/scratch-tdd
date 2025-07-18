import { useNavigate } from '@tanstack/react-router';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

import { AuthContext, CoreShared } from 'core';

import type { AuthContextTypes } from 'core';
export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();

    const loginMutation = AuthContext.AuthLoginUseCase.LoginHooks.useLoginMutation();
    const { loginForm } =
        AuthContext.AuthLoginUseCase.LoginHooks.useLoginFormHandler(loginFormSubmit);
    const navigate = useNavigate();
    const setUser = AuthContext.AuthStore.authStore.useAuthStore((state) => state.setUser);
    const setAccessToken = CoreShared.tokenStore.useTokenStore((state) => state.setAccessToken);

    function loginFormSubmit({ email, password }: AuthContextTypes.LoginUseCaseTypes.LoginPayload) {
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    AuthContext.AuthLoginUseCase.LoginService.onLoginSuccessfully({
                        callbacks: {
                            setAccessToken,
                            setUser,
                            successToast,
                            navigate: () => navigate({ to: '/' }),
                        },
                        data: data,
                    });
                },
                onError: (error) => {
                    AuthContext.AuthLoginUseCase.LoginService.loginFailedMessage(error, errorToast);
                },
            },
        );
    }
    return { loginForm };
};

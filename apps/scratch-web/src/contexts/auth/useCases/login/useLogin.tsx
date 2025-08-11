import { useNavigate } from '@tanstack/react-router';

import { AuthContext, CoreShared } from 'core';

import type { LoginUseCaseTypes } from 'core';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();

    const loginMutation = AuthContext.AuthLoginUseCase.LoginHooks.useLoginMutation();
    const { loginForm } =
        AuthContext.AuthLoginUseCase.LoginHooks.useLoginFormHandler(loginFormSubmit);
    const navigate = useNavigate();
    const setUser = AuthContext.AuthStore.authStore.useAuthStore((state) => state.setUser);
    const setAccessToken = CoreShared.tokenStore.useTokenStore((state) => state.setAccessToken);

    function loginFormSubmit({ email, password }: LoginUseCaseTypes.LoginPayload) {
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

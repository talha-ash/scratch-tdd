import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

import { AuthContext, CoreShared } from 'core';
import type { AuthContextTypes } from 'core';
import { useNavigate } from '@tanstack/react-router';

export const useRegister = () => {
    const { successToast, errorToast } = useToastNotification();
    const registerMutation =
        AuthContext.AuthRegistrationUseCase.RegistrationHooks.useRegistrationMutation();
    const { registerForm } =
        AuthContext.AuthRegistrationUseCase.RegistrationHooks.useRegistrationFormHandler(
            registerFormSubmit,
        );
    const navigate = useNavigate();
    const setUser = AuthContext.AuthStore.authStore.useAuthStore((state) => state.setUser);
    const setAccessToken = CoreShared.tokenStore.useTokenStore((state) => state.setAccessToken);

    function registerFormSubmit(
        payload: AuthContextTypes.RegistrationUseCaseTypes.RegisterPayload,
    ) {
        registerMutation.mutation.mutate(payload, {
            onSuccess: (data) => {
                AuthContext.AuthRegistrationUseCase.RegistrationService.registerSuccessMessage({
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
                AuthContext.AuthRegistrationUseCase.RegistrationService.registerFailedMessage(
                    error,
                    errorToast,
                );
            },
        });
    }
    return { registerForm };
};

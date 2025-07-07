import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

import { AuthContext } from 'core';
import type { AuthContextTypes } from 'core';

export const useRegister = () => {
    const { successToast, errorToast } = useToastNotification();
    const registerMutation =
        AuthContext.AuthRegistrationUseCase.RegistrationHooks.useRegistrationMutation();
    const { registerForm } =
        AuthContext.AuthRegistrationUseCase.RegistrationHooks.useRegistrationFormHandler(
            registerFormSubmit,
        );

    function registerFormSubmit(
        payload: AuthContextTypes.RegistrationUseCaseTypes.RegisterPayload,
    ) {
        registerMutation.mutation.mutate(payload, {
            onSuccess: () => {
                AuthContext.AuthRegistrationUseCase.RegistrationService.registerSuccessMessage(
                    successToast,
                );
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

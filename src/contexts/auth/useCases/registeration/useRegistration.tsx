import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { useRegisterMutation } from './useRegisterMutation';
import {
    registerFailedMessage,
    registerSuccessMessage,
    type RegisterPayload,
} from './registerService';
import { useRegisterFormHandler } from './useRegisterFormHandler';

export const useRegister = () => {
    const { successToast, errorToast } = useToastNotification();
    const registerMutation = useRegisterMutation();
    const { registerForm } = useRegisterFormHandler(registerFormSubmit);

    function registerFormSubmit(payload: RegisterPayload) {
        registerMutation.mutation.mutate(payload, {
            onSuccess: () => {
                registerSuccessMessage(successToast);
            },
            onError: (error) => {
                registerFailedMessage(error, errorToast);
            },
        });
    }
    return { registerForm };
};

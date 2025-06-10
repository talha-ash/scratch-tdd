import { useLoginMutation } from './useLoginMutation';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { useLoginFormHandler } from './useLoginFormHandler';
import { loginFailedMessage, loginSuccessMessage, type LoginPayload } from './loginService';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();
    const loginMutation = useLoginMutation();
    const { loginForm } = useLoginFormHandler(loginFormSubmit);

    function loginFormSubmit({ email, password }: LoginPayload) {
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    loginSuccessMessage(successToast);
                },
                onError: (error) => {
                    loginFailedMessage(error, errorToast);
                },
            },
        );
    }
    return { loginForm };
};

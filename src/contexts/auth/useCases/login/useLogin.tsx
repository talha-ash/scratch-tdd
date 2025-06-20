import { useLoginMutation } from './useLoginMutation';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { useLoginFormHandler } from './useLoginFormHandler';
import { loginFailedMessage, onLoginSuccessfully, type LoginPayload } from './loginService';
import { authStore } from './authStore';
import { useNavigate } from '@tanstack/react-router';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();
    const loginMutation = useLoginMutation();
    const { loginForm } = useLoginFormHandler(loginFormSubmit);
    const navigate = useNavigate();

    const { setAccessToken } = authStore.useAuthStore();

    function loginFormSubmit({ email, password }: LoginPayload) {
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    navigate({to: "/"})
                    onLoginSuccessfully(successToast);
                    setAccessToken(data.token);
                },
                onError: (error) => {
                    loginFailedMessage(error, errorToast);
                },
            },
        );
    }
    return { loginForm };
};

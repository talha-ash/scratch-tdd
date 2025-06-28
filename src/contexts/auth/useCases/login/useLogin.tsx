import { useNavigate } from '@tanstack/react-router';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { tokenStore } from '~/shared/infrastructure/tokenStore';
import { loginFailedMessage, onLoginSuccessfully, type LoginPayload } from './loginService';
import { useLoginFormHandler } from './useLoginFormHandler';
import { useLoginMutation } from './useLoginMutation';
import { authStore } from '../../authStore';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();
    const loginMutation = useLoginMutation();
    const { loginForm } = useLoginFormHandler(loginFormSubmit);
    const navigate = useNavigate();
    const setUser = authStore.useAuthStore((state) => state.setUser);
    const setAccessToken = tokenStore.useTokenStore((state) => state.setAccessToken);

    function loginFormSubmit({ email, password }: LoginPayload) {
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    setAccessToken(data.token);
                    setUser(data.user);
                    navigate({ to: '/' });
                    onLoginSuccessfully(successToast);
                },
                onError: (error) => {
                    loginFailedMessage(error, errorToast);
                },
            },
        );
    }
    return { loginForm };
};

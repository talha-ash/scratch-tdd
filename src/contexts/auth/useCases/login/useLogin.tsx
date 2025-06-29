import { useNavigate } from '@tanstack/react-router';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { tokenStore } from '~/shared/infrastructure/tokenStore';
import { authStore } from '../../authStore';
import { loginFormSubmit, type LoginMutationPayload } from './loginService';

import { useLoginFormHandler } from './useLoginFormHandler';
import { useLoginMutation } from './useLoginMutation';
import type { ILoginPorts } from './loginPorts';

export const useLogin = () => {
    const { successToast, errorToast }: ILoginPorts['toastService'] = useToastNotification();
    const loginMutation = useLoginMutation();
    const { loginForm } = useLoginFormHandler(formSubmitHandler);
    const navigate = useNavigate();
    const AuthStoreService: ILoginPorts['authStoreService'] = {
        setUser: authStore.useAuthStore((state) => state.setUser),
    };
    const TokenStoreService: ILoginPorts['tokenStoreService'] = {
        setAccessToken: tokenStore.useTokenStore((state) => state.setAccessToken),
    };

    function formSubmitHandler({ email, password }: LoginMutationPayload) {
        loginFormSubmit({
            data: { email, password },
            deps: {
                toast: { successToast, errorToast },
                mutate: loginMutation.mutation.mutate,
                navigate,
                setAccessToken: TokenStoreService.setAccessToken,
                setUser: AuthStoreService.setUser,
            },
        });
    }

    return { loginForm };
};

import { useLoginMutation } from './useLoginMutation';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { LOGIN_SUCCESSFULLY } from '../../constants/textConstant';
import { useLoginFormHandler, type LoginData } from './useLoginFormHandler';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();
    const loginMutation = useLoginMutation();
    const { loginForm } = useLoginFormHandler(loginFormSubmit);

    function loginFormSubmit({ email, password }: LoginData) {
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: () => {                   
                    successToast(LOGIN_SUCCESSFULLY);
                },
                onError: (error) => {                   
                    if (error.type == 'http') {
                        errorToast(error.data.message);
                    }
                },
            },
        );
    }
    return { loginForm };
};

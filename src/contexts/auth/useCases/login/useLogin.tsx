import { useState } from 'react';
import { useLoginMutation } from './useLoginMutation';
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { LOGIN_SUCCESSFULLY } from '../../constants/textConstant';

export const useLogin = () => {
    const { successToast, errorToast } = useToastNotification();
    const loginMutation = useLoginMutation();
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    const loginFormSubmit = () => {
        const { email, password } = formState;
        loginMutation.mutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    console.log(data);
                    successToast(LOGIN_SUCCESSFULLY);
                },
                onError: (error) => {
                    if (error.type == 'http') {
                        errorToast(error.data.message);
                    }
                },
            },
        );
    };
    return { formState, setFormState, loginFormSubmit };
};

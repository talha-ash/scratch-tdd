import { useForm } from '@tanstack/react-form';
import { getLoginSchema } from './loginService';
import type { LoginPayload } from './types';

export const useLoginFormHandler = (loginFormSubmit: (value: LoginPayload) => void) => {
    const loginForm = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onChange: getLoginSchema(),
        },
        onSubmit: ({ value }) => {
            loginFormSubmit(value);
        },
    });

    return { loginForm };
};

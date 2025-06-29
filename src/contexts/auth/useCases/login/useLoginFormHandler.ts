import { useForm } from '@tanstack/react-form';
import { getLoginSchema, type LoginMutationPayload } from './loginService';

export const useLoginFormHandler = (loginFormSubmit: (value: LoginMutationPayload) => void) => {
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

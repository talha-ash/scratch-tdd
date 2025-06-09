import * as v from 'valibot';
import { EMAIL_IS_INVALID, PASSWORD_IS_INCORRECT } from '../../constants/textConstant';
import { useForm } from '@tanstack/react-form';

const LoginSchema = v.object({
    email: v.message(v.pipe(v.string(), v.email()), EMAIL_IS_INVALID),
    password: v.message(v.pipe(v.string(), v.minLength(8)), PASSWORD_IS_INCORRECT),
});

export type LoginData = v.InferOutput<typeof LoginSchema>;

export const useLoginFormHandler = (loginFormSubmit: (value: LoginData) => void) => {
    const loginForm = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onChange: LoginSchema,
        },
        onSubmit: ({ value }) => {
            loginFormSubmit(value);
        },
    });

    return { loginForm };
};

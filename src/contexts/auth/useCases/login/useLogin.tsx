import { useState } from 'react';
import { useLoginMutation } from './useLoginMutation';

export const useLogin = () => {
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
                },
                onError: (error) => {
                    console.log(error);
                },
            },
        );
    };
    return { formState, setFormState, loginFormSubmit };
};

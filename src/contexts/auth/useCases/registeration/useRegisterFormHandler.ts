import { useForm } from '@tanstack/react-form';
import { getRegisterSchema, type RegisterPayload } from './registerService';
import { useState } from 'react';

export const useRegisterFormHandler = (registerFormSubmit: (value: RegisterPayload) => void) => {
    const [isSubmissionPerformed, setIsSubmissionPerformed] = useState(false);
    const validators = isSubmissionPerformed
        ? {
              onChange: getRegisterSchema(),
          }
        : {
              onSubmit: getRegisterSchema(),
          };

    const registerForm = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
        },
        validators: validators,
        onSubmit: ({ value }) => {
            registerFormSubmit(value);
        },
        onSubmitInvalid: () => {
            setIsSubmissionPerformed(true);
        },
    });

    return { registerForm };
};

import { useForm } from '@tanstack/react-form';
import { getRegisterSchema } from './registerService';
import { useState } from 'react';
import type { RegisterPayload } from './types';

export const useRegistrationFormHandler = (registerFormSubmit: (value: RegisterPayload) => void) => {
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

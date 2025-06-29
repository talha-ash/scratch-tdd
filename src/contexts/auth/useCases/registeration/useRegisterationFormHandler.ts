import { useForm } from '@tanstack/react-form';
import { getRegisterationSchema, type RegisterationPayload } from './registerationService';
import { useState } from 'react';

export const useRegisterFormHandler = (registerationFormSubmit: (value: RegisterationPayload) => void) => {
    const [isSubmissionPerformed, setIsSubmissionPerformed] = useState(false);
    const validators = isSubmissionPerformed
        ? {
              onChange: getRegisterationSchema(),
          }
        : {
              onSubmit: getRegisterationSchema(),
          };

    const registerationForm = useForm({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
        },
        validators: validators,
        onSubmit: ({ value }) => {
            registerationFormSubmit(value);
        },
        onSubmitInvalid: () => {
            setIsSubmissionPerformed(true);
        },
    });

    return { registerationForm };
};

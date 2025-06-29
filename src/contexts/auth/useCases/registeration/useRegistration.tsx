import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';
import { registerationFormSubmit, type RegisterationPayload } from './registerationService';
import { useRegisterFormHandler } from './useRegisterationFormHandler';
import { useRegisterationMutation } from './useRegisterationMutation';
import type { IRegisterationPorts } from './registerationPorts';

export const useRegisteration = () => {
    const { successToast, errorToast }: IRegisterationPorts['toastService'] = useToastNotification();
    const registerMutation = useRegisterationMutation();
    const { registerationForm } = useRegisterFormHandler(formSubmitHandler);

    function formSubmitHandler(payload: RegisterationPayload) {
        registerationFormSubmit({
            data: payload,
            deps: {
                mutate: registerMutation.mutation.mutate,
                toast: { successToast, errorToast },
            },
        });
    }
    return { registerationForm };
};

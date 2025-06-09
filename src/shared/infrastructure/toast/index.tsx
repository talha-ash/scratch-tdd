import { toast } from 'react-hot-toast';

export interface IToastNotification {
    successToast: (message: string) => void;
    errorToast: (message: string) => void;
    warningToast: (message: string) => void;
}

export function toastNotification(): IToastNotification {
    return {
        successToast: (message: string) => toast.success(message),
        errorToast: (message: string) => toast.error(message),
        warningToast: (message: string) =>
            toast(message, {
                className: 'bg-red',
            }),
    };
}

import { toast } from 'react-hot-toast';
import { buildContext } from '../../diContext';

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

export function createToastNotificationContext(value?: IToastNotification) {
    const { useToastNotification, createProvider } = buildContext<
        IToastNotification,
        'useToastNotification'
    >('useToastNotification');
    const ToastProvider = createProvider(value || toastNotification());
    return { ToastProvider, useToastNotification };
}
const { useToastNotification, ToastProvider } = createToastNotificationContext();

export { useToastNotification, ToastProvider };

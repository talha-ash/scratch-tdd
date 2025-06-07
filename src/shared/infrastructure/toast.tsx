import { toast, type ToastOptions, Toaster, type ToasterProps } from 'react-hot-toast';
import { buildContext } from '../diContext';

export interface IToastNotification<T> {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    Toaster: T;
}

export function ToastNotification<T>(Toaster: T): IToastNotification<T> {
    return {
        success: (message: string) => toast.success(message),
        error: (message: string) => toast.error(message),
        warning: (message: string) =>
            toast(message, {
                className: 'bg-red',
            }),
        Toaster: Toaster,
    };
}

const { useToastNotification, createProvider } = buildContext(   
    'useToastNotification',
    ToastNotification(Toaster)
);

// const { useToastNotification, createProvider } = buildContext<IToastNotification, "useToastNotification">(   
//     'useToastNotification',
//     // ToastNotification(Toaster)
// );

export const createToastNotificationProvider = (
    value?: IToastNotification<React.FC<ToasterProps>>,
) => {
    const ToastProvider = createProvider(value);
    return ToastProvider;
};

export { useToastNotification };

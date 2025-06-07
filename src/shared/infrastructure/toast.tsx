import { toast, type ToastOptions, Toaster } from 'react-hot-toast';
import { buildContext, createProvider } from '../diContext';

export interface IToastNotification<ToastComponent> {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    Toaster: ToastComponent;
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

const { Component, props, useToastNotification } = buildContext(
    ToastNotification(Toaster),
    'useToastNotification',
);

export const ToastProvider = createProvider(Component, {value: props})


export { useToastNotification };

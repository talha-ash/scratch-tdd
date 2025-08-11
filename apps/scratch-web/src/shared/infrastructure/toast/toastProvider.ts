import { CoreShared } from 'core';
import { toastNotification } from '.';
import type { IToastNotification } from '.';

const { useToastNotification, createProvider } = CoreShared.buildContext<
    IToastNotification,
    'useToastNotification'
>('useToastNotification');

function createToastProvider(value?: IToastNotification) {
    return createProvider(value || toastNotification());
}

export { useToastNotification, createToastProvider };

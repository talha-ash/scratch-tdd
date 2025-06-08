import { toastNotification, type IToastNotification } from '.';
import { buildContext } from '~/shared/diContext';

const { useToastNotification, createProvider } = buildContext<
    IToastNotification,
    'useToastNotification'
>('useToastNotification');

function createToastProvider(value?: IToastNotification) {
    return createProvider(value || toastNotification());
}

export { useToastNotification, createToastProvider };

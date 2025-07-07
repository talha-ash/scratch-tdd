import { toastNotification, type IToastNotification } from '.';
import {CoreShared} from "core"

const { useToastNotification, createProvider } = CoreShared.buildContext<
    IToastNotification,
    'useToastNotification'
>('useToastNotification');

function createToastProvider(value?: IToastNotification) {
    return createProvider(value || toastNotification());
}

export { useToastNotification, createToastProvider };

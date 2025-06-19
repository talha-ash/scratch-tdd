import { toast } from 'react-hot-toast';

export interface IToastNotification {
    successToast: (message: string) => void;
    errorToast: (message: string | string[]) => void;
    warningToast: (message: string) => void;
}

export function toastNotification(): IToastNotification {
    return {
        successToast: (message: string) => toast.success(message),
        errorToast: (message: string | string[]) => {
            if (Array.isArray(message)) {
                const Message = () => (
                    <div>
                        {message.map((message, index) => {
                            return <h1 key={index}>{message}</h1>;
                        })}
                    </div>
                );
                toast.custom(<Message />);
            } else {
                toast.error(message);
            }
        },
        warningToast: (message: string) =>
            toast(message, {
                className: 'bg-red',
            }),
    };
}

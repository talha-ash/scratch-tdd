import { toast } from 'react-hot-toast';

export interface IToastNotification {
    successToast: (message: string) => void;
    errorToast: (message: string | Array<string>) => void;
    warningToast: (message: string) => void;
}

export function toastNotification(): IToastNotification {
    return {
        successToast: (message: string) => toast.success(message, { duration: 4000000 }),
        errorToast: (message: string | Array<string>) => {
            if (Array.isArray(message)) {
                const Message = () => (
                    <div>
                        {message.map((mess, index) => {
                            return <h1 key={index}>{mess}</h1>;
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

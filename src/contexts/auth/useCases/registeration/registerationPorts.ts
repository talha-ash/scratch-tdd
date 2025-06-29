export interface IRegisterationPorts {
    toastService: {
        successToast: (message: string) => void;
        errorToast: (message: string | string[]) => void;
    };
}

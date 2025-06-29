import type { User } from '../../domain/user';

export interface ILoginPorts {
    authStoreService: {
        setUser: (user: User | null) => void;
    };

    tokenStoreService: {
        setAccessToken: (token: string) => void;
    };

    toastService: {
        successToast: (message: string) => void;
        errorToast: (message: string | string[]) => void;
    };
}

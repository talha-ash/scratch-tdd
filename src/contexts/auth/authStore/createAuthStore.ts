import { create } from 'zustand';
import { mutative } from 'zustand-mutative';

export type AuthStoreState = {
    data: { accessToken: string | null };
};

export type AuthStoreActions = {
    setAccessToken: (token: string | null) => void;
};

export function createAuthStore(intialValue?: AuthStoreState['data']) {
    return create<AuthStoreState & AuthStoreActions>()(
        mutative((set) => ({
            data: { accessToken: null, ...intialValue },
            setAccessToken: (token) =>
                set((state) => {
                    state.data.accessToken = token;
                }),
        })),
    );
}

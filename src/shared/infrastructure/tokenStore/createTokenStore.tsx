import { create } from 'zustand';
import { mutative } from 'zustand-mutative';

export type TokenStoreState = {
    accessToken: string | null;
};

export type TokenStoreActions = {
    setAccessToken: (token: string | null) => void;
};

export function createTokenStore(intialValue?: TokenStoreState) {
    return create<TokenStoreState & TokenStoreActions>()(
        mutative((set) => ({
            accessToken: intialValue?.accessToken ?? null,
            setAccessToken: (token) =>
                set((state) => {
                    state.accessToken = token;
                }),
        })),
    );
}

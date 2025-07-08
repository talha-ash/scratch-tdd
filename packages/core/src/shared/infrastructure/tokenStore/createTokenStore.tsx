import { create } from 'zustand';
import { mutative } from 'zustand-mutative';
import type { TokenStoreActions, TokenStoreState } from './types';



export function createTokenStore(initialValue?: TokenStoreState) {
    return create<TokenStoreState & TokenStoreActions>()(
        mutative((set) => ({
            accessToken: initialValue?.accessToken ?? null,
            setAccessToken: (token) =>
                set((state) => {
                    state.accessToken = token;
                }),
        })),
    );
}

import { create } from 'zustand';
import { mutative } from 'zustand-mutative';
import type { AuthStoreActions, AuthStoreState } from './types';

export function createAuthStore() {
    return create<AuthStoreState & AuthStoreActions>()(
        mutative((set) => ({
            data: { user: null },
            setUser: (user) =>
                set((state) => {
                    state.data.user = user;
                }),
        })),
    );
}

import { create } from 'zustand';
import { mutative } from 'zustand-mutative';
import type { User } from '../domain/user';

export type AuthStoreState = {
    data: { user: User | null };
};

export type AuthStoreActions = {
    setUser: (user: User | null) => void;
};

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

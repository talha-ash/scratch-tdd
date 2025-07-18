import type { User } from '../domain/user/types';
import { createAuthStore } from './createAuthStore';
import type { AuthStoreState, AuthStoreActions } from './types';

const useStore = createAuthStore();

function useAuthStore(): AuthStoreState & AuthStoreActions;
function useAuthStore<T>(selector: (selector: AuthStoreState & AuthStoreActions) => T): T;

function useAuthStore<T>(selector?: (selector: AuthStoreState & AuthStoreActions) => T) {
    if (selector) {
        return useStore(selector);
    }
    return useStore((state) => state);
}

function setUser(user: User | null) {
    useStore.getState().setUser(user);
}
function userSelector(state: AuthStoreState & AuthStoreActions) {
    return state.data.user!;
}

export const authStore = {
    useAuthStore,
    userSelector,
    setUser,
};

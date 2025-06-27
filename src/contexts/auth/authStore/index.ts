import { createAuthStore, type AuthStoreActions, type AuthStoreState } from './createAuthStore';

const useStore = createAuthStore();

function getAccessToken() {
    return useStore.getState().data.accessToken;
}

function useAuthStore<T = AuthStoreState & AuthStoreActions>(
    selector?: (selector: AuthStoreState & AuthStoreActions) => T,
) {
    if (selector) {
        return useStore(selector);
    }
    return useStore((state) => state);
}

export const authStore = {
    useAuthStore,
    getAccessToken,
    setAccessToken: useStore.getState().setAccessToken,
};

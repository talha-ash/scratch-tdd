import { createAuthStore, type AuthStoreActions, type AuthStoreState } from './createAuthStore';

const useStore = createAuthStore();

function getAccessToken() {
    return useStore.getState().data.accessToken;
}

function useAuthStore<T>(selector: (selector: AuthStoreState & AuthStoreActions) => T) {
    return useStore(selector);
}

export const authStore = {
    useAuthStore,
    getAccessToken,
    setAccessToken: useStore.getState().setAccessToken,
};

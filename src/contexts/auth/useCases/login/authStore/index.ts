import { createAuthStore } from './createAuthStore';

const useAuthStore = createAuthStore();

function getAccessToken() {
    return useAuthStore.getState().data.accessToken;
}

export const authStore = {
    useAuthStore,
    getAccessToken,
    setAccessToken: useAuthStore.getState().setAccessToken,
};

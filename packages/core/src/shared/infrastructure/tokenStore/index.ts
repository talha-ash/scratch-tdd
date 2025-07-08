import { authStore } from 'src/contexts/auth/authStore';
import { createTokenStore } from './createTokenStore';
import type { User } from 'src/contexts/auth/domain';
import type { TokenStoreActions, TokenStoreState } from './types';

const useStore = createTokenStore();

function getAccessToken() {
    return useStore.getState().accessToken;
}

function useTokenStore<T>(selector: (selector: TokenStoreActions & TokenStoreState) => T): T;
function useTokenStore(): TokenStoreState & TokenStoreActions;

function useTokenStore<T>(selector?: (selector: TokenStoreActions & TokenStoreState) => T) {
    if (!selector) {
        return useStore((state) => state);
    }
    return useStore(selector);
}

function setTokenAndUserType(token: string, user: User | null) {
    authStore.setUser(user);
    useStore.getState().setAccessToken(token);
}
export const tokenStore = {
    useTokenStore,
    getAccessToken,
    setAccessToken: useStore.getState().setAccessToken,
    setTokenAndUserType,
};

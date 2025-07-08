export type TokenStoreState = {
    accessToken: string | null;
};

export type TokenStoreActions = {
    setAccessToken: (token: string | null) => void;
};

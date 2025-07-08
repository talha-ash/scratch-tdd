import type { User } from "../domain/user/types";

export type AuthStoreState = {
    data: { user: User | null };
};

export type AuthStoreActions = {
    setUser: (user: User | null) => void;
};

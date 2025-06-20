import { create } from 'zustand';
import { mutative } from 'zustand-mutative';

type State = {
    data: { accessToken: string | null };
};

type Actions = {
    setAccessToken: (token: string) => void;
};

export function createAuthStore(intialValue?: State['data']) {
    return create<State & Actions>()(
        mutative((set) => ({
            data: { accessToken: null, ...intialValue },
            setAccessToken: (token: string) =>
                set((state) => {
                    state.data.accessToken = token;                    
                }),
        })),
    );
}

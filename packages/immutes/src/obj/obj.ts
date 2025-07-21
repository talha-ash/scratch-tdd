import { castImmutable, create, markSimpleObject, type Draft, type Immutable } from 'mutative';
import { createInitialMutation, createMutation } from 'src/common';

export function newObj<T extends Record<string, unknown>>(initial: T) {
    const state = createInitialMutation(initial, (draft) => {
        draft = initial as Draft<T>;
    });
    return state;
}

export function set<T>(
    state: Immutable<T>,
    key: keyof Draft<Immutable<T>>,
    value: Draft<Immutable<T>>[keyof Draft<Immutable<T>>],
) {
    const [draft, finalize] = createMutation(state);
    draft[key] = value;
    return finalize();
}

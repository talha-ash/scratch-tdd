import { type Draft, type Immutable } from 'mutative';
import { createInitialMutation, createMutation } from 'src/common';

export function newList<T>(initial: T[]) {
    const state = createInitialMutation(initial, (draft) => {
        draft = initial as Draft<T[]>;
    });
    return state;
}

export function push<T>(state: Immutable<T[]>, value: Draft<Immutable<T>>) {
    const [draft, finalize] = createMutation(state);
    draft.push(value);
    return finalize();
}

export function pop<T>(state: Immutable<T[]>) {
    const [draft, finalize] = createMutation(state);
    draft.pop();
    return finalize();
}

export function map<T>(
    state: Immutable<T[]>,
    fn: (item: Draft<Immutable<T>>) => Draft<Immutable<T>>,
) {
    let [draft, finalize] = createMutation(state);
    draft.forEach((item, index) => {
        draft[index] = fn(item);
    });
    return finalize();
}

export function filter<T>(state: Immutable<T[]>, fn: (item: Draft<Immutable<T>>) => Boolean) {
    let [draft, finalize] = createMutation(state);

    draft.forEach((item, index) => {
        const bool = fn(item);
        if (!bool) {
            draft.splice(index, 1);
        }
    });
    return finalize();
}

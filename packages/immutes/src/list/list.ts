import { markSimpleObject, type Draft, type Immutable } from 'mutative';
import { createInitialMutation, createMutation } from 'src/common';

export function newList<T>(initial: T[]) {
    const state = createInitialMutation(initial, (draft) => {
        return draft;
    });
    return state;
}

export function push<T>(state: readonly Immutable<T>[], ...value: Draft<Immutable<T>>[]) {
    const [draft, finalize] = createMutation(state);
    draft.push(...value);
    return finalize();
}

export function pop<T>(state: readonly Immutable<T>[]) {
    const [draft, finalize] = createMutation(state);
    const item = draft.pop();
    return [item, finalize()];
}

export function shift<T>(state: readonly Immutable<T>[]) {
    const [draft, finalize] = createMutation(state);
    const item = draft.shift();
    return [item, finalize()];
}

export function unshift<T>(state: readonly Immutable<T>[], ...value: Draft<Immutable<T>>[]) {
    const [draft, finalize] = createMutation(state);
    draft.unshift(...value);
    return finalize();
}

export function map<T>(
    state: readonly Immutable<T>[],
    fn: (item: Draft<Immutable<T>>) => Draft<Immutable<T>>,
) {
    const [draft, finalize] = createMutation(state);
    draft.forEach((item, index) => {
        draft[index] = fn(item);
    });
    return finalize();
}

export function filter<T>(
    state: readonly Immutable<T>[],
    fn: (item: Draft<Immutable<T>>) => boolean,
) {
    const [draft, finalize] = createMutation(state);

    draft.forEach((item, index) => {
        const bool = fn(item);
        if (!bool) {
            draft.splice(index, 1);
        }
    });
    return finalize();
}

export function reduce<T, R>(
    state: readonly Immutable<T>[],
    fn: (acc: NonNullable<R>, currentValue: Immutable<T>, index: number) => NonNullable<R>,
    initialValue: NonNullable<R>,
): Immutable<R>;

export function reduce<T, R extends Immutable<T>>(
    state: readonly Immutable<T>[],
    fn: (acc: Draft<R>, currentValue: Immutable<T>, index: number) => Draft<R>,
): Immutable<R>;

export function reduce<T, R>(
    state: readonly Immutable<T>[],
    fn: (
        acc: NonNullable<R> | Draft<Immutable<T>> | Draft<R>,
        currentValue: Immutable<T> | Draft<Immutable<T>>,
        index: number,
    ) => R | Draft<Immutable<T>>,
    initialValue?: R,
) {
    if (initialValue != undefined) {
        if (typeof initialValue === 'object') {
            const [draft, finalize] = createMutation(initialValue);
            state.forEach((item, index) => {
                initialValue = fn(draft, item, index) as NonNullable<R>;
            });

            return finalize();
        } else {
            state.forEach((item, index) => {
                initialValue = fn(initialValue!, item, index) as NonNullable<R>;
            });

            if (typeof initialValue === 'object') {
                return markSimpleObject(initialValue);
            }
            return initialValue;
        }
    } else {
        const [draft, finalize] = createMutation(state);
        let firstItem = draft[0];

        state.slice(1).forEach((item, index) => {
            firstItem = fn(firstItem, item, index + 1) as Draft<Immutable<T>>;
        });
        finalize();
        if (typeof firstItem === 'object') {
            return markSimpleObject(firstItem);
        }
        return firstItem;
    }
}

export function concat<T, R extends Array<T>[]>(state: readonly Immutable<T>[], ...value: R) {
    const [draft, finalize] = createMutation(state);
    value.forEach((list) => {
        list.forEach((item) => {
            draft.push(item as Draft<Immutable<T>>);
        });
    });
    return finalize();
}

export function updateAtIndex<T>(
    state: readonly Immutable<T>[],
    index: number,
    value: Draft<Immutable<T>>,
) {
    const [draft, finalize] = createMutation(state);
    draft[index] = value;

    return finalize();
}

export function insertAtIndex<T>(
    state: readonly Immutable<T>[],
    index: number,
    value: Draft<Immutable<T>>,
) {
    const [draft, finalize] = createMutation(state);
    draft.splice(index, 0, value);

    return finalize();
}

export function removeByIndex<T>(state: readonly Immutable<T>[], index: number) {
    const [draft, finalize] = createMutation(state);
    draft.splice(index, 1);

    return finalize();
}

export function updateByKey<T>(
    state: readonly Immutable<T>[],
    key: keyof Draft<Immutable<T>>,
    searchQuery: T[keyof T],
    value: Draft<Immutable<T>>,
) {
    const [draft, finalize] = createMutation(state);
    const index = draft.findIndex((item) => item[key] === searchQuery);
    if (index !== -1) draft[index] = value;

    return finalize();
}

export function deleteByKey<T>(
    state: readonly Immutable<T>[],
    key: keyof Draft<Immutable<T>>,
    searchQuery: T[keyof T],
) {
    const [draft, finalize] = createMutation(state);
    const index = draft.findIndex((item) => item[key] === searchQuery);
    if (index !== -1) draft.splice(index, 1);

    return finalize();
}

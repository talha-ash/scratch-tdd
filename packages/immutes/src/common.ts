import { create, type Draft } from 'mutative';

export function createMutation<T>(state: T) {
    return create(state, { enableAutoFreeze: true, strict: true });
}

export function createInitialMutation<T, F extends (draft: Draft<T>) => void>(state: T, fn: F) {
    return create(state, fn, { enableAutoFreeze: true, strict: true });
}

import { type Draft, type Immutable } from 'mutative';
import { createInitialMutation, createMutation } from 'src/common';

export function newObj<T extends Record<string, unknown>>(initial: T) {
    const state = createInitialMutation(initial, (draft) => {
        draft = initial as Draft<T>;
    });
    return state;
}

export function set<T extends Record<string, any>>(
    state: Immutable<T>,
    key: keyof Draft<Immutable<T>>,
    value: Draft<Immutable<T>>[keyof Draft<Immutable<T>>],
) {
    if (!Object.hasOwn(state, key)) {
        throw new TypeError(`Key '${String(key)}' does not exist in the object.`);
    }
    const [draft, finalize] = createMutation(state);
    draft[key] = value;
    return finalize();
}

export function setNew<T extends Record<string, unknown>, R, K extends string>(
    state: Immutable<T>,
    key: K extends keyof T ? never : K,
    value: R,
) {
    let [draft, finalize] = createMutation(state);

    Object.assign(draft, { [key]: value });

    return finalize() as Immutable<T & Record<K, R>>;
}

export function merge<T extends Record<string, unknown>, R extends Record<string, unknown>>(
    state: Immutable<T>,
    value: R,
) {
    let [draft, finalize] = createMutation(state);

    Object.assign(draft, { ...value });

    return finalize() as Immutable<merge<T, R>>;
}
type merge<base, prop> = Omit<base, keyof prop & keyof base> & prop;

export function deleteKey<T extends Record<string, unknown>, K extends keyof Draft<Immutable<T>>>(
    state: Immutable<T>,
    key: K,
) {
    let [draft, finalize] = createMutation(state);

    delete draft[key];

    return finalize() as Immutable<Omit<T, K>>;
}

export function updateByPath<T extends Record<string, any>>(
    state: Immutable<T>,
    path: string[],
    value: string | number | boolean | undefined | null | Date,
) {
    if (!Array.isArray(path) || path.length === 0) {
        throw new TypeError('Path must be a non-empty array of strings');
    }

    const [draft, finalize] = createMutation(state);
    let current: any = draft;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];

        if (
            !Object.hasOwn(current, key) ||
            typeof current[key] !== 'object' ||
            current[key] === null
        ) {
            throw new TypeError(
                `Path '${path.slice(0, i + 1).join('.')}' does not exist or is not an object`,
            );
        }
        current = current[key];
    }
    const finalKey = path[path.length - 1];

    if (!Object.hasOwn(current, finalKey)) {
        throw new TypeError(`Key '${finalKey}' does not exist at path '${path.join('.')}'`);
    }
    current[finalKey] = value;
    return finalize();
}

export function deleteKeyByPath<T extends Record<string, any>>(
    state: Immutable<T>,
    path: string[],
) {
    if (!Array.isArray(path) || path.length === 0) {
        throw new TypeError('Path must be a non-empty array of strings');
    }

    const [draft, finalize] = createMutation(state);
    let current: any = draft;
    for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];

        if (
            !Object.hasOwn(current, key) ||
            typeof current[key] !== 'object' ||
            current[key] === null
        ) {
            throw new TypeError(
                `Path '${path.slice(0, i + 1).join('.')}' does not exist or is not an object`,
            );
        }
        current = current[key];
    }
    const finalKey = path[path.length - 1];

    if (!Object.hasOwn(current, finalKey)) {
        throw new TypeError(`Key '${finalKey}' does not exist at path '${path.join('.')}'`);
    }
    delete current[finalKey];
    return finalize();
}

import React from 'react';

interface Provider<TProps> {
    Component: React.ComponentType<React.PropsWithChildren<TProps>>;
    props?: Omit<TProps, 'children'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function composeProviders<TProviders extends Array<Provider<any>>>(
    providers: TProviders,
): React.ComponentType<React.PropsWithChildren> {
    const ProviderComponent: React.FunctionComponent<React.PropsWithChildren> = ({ children }) => {
        const initialJSX = <>{children}</>;

        return providers.reduceRight<React.JSX.Element>(
            (prevJSX, { Component: CurrentProvider, props = {} }) => {
                return <CurrentProvider {...props}>{prevJSX}</CurrentProvider>;
            },
            initialJSX,
        );
    };

    return ProviderComponent;
}

export function createProvider<TProps>(
    Component: React.ComponentType<React.PropsWithChildren<TProps>>,
    props?: Omit<TProps, 'children'>,
): Provider<TProps> {
    return {
        Component,
        props,
    };
}

export function buildContext<TContextValue>(value: TContextValue, contextName: `use${string}`) {
    const context = React.createContext<TContextValue>(value);

    return {
        Component: context.Provider,
        props: value,
        ['use' + contextName]: () => React.useContext(context),
    };
}

// function add<T extends {child: string}>(a: T, b: Omit<T, "child">){
//     return[a, b]
// }

// const result = add({child: "a", d: 1, c:1}, {d:1, c:2})

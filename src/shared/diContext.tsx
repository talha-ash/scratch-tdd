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

export const ComposeProvider = ({
    providers,
    children,
}: {
    providers: Array<Provider<any>>;
    children: React.ReactNode;
}) => {
    const Provider = composeProviders(providers);
    return <Provider>{children}</Provider>;
};

function createProvider<TProps>(
    Component: React.ComponentType<React.PropsWithChildren<TProps>>,
    props?: Omit<TProps, 'children'>,
): Provider<TProps> {
    return {
        Component,
        props,
    };
}

export function buildContext<TContextValue, Tname extends `use${string}`>(
    contextName: Tname,
    initialValue?: TContextValue,
) {
    const context = React.createContext<TContextValue | undefined>(initialValue);

    return {
        // Component: context.Provider,
        createProvider: (value?: TContextValue) =>
            createProvider(context.Provider, { value: value || initialValue }),
        props: initialValue,
        [contextName]: () => React.useContext(context),
    } as {
        // Component: React.Provider<TContextValue>;
        props: TContextValue | undefined;
        createProvider: (value?: TContextValue) => Provider<{ value: TContextValue }>;
    } & Record<Tname, () => TContextValue>;
}

// function add<T extends {child: string}>(a: T, b: Omit<T, "child">){
//     return[a, b]
// }

// const result = add({child: "a", d: 1, c:1}, {d:1, c:2})

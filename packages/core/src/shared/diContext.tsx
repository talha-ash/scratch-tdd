import React from 'react';

export interface ComposeContextProvider<TProps> {
    Component: React.ComponentType<React.PropsWithChildren<TProps>>;
    props?: Omit<TProps, 'children'>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function composeProviders<TProviders extends Array<ComposeContextProvider<any>>>(
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    providers: Array<ComposeContextProvider<any>>;
    children: React.ReactNode;
}) => {
    const Provider = composeProviders(providers);
    return <Provider>{children}</Provider>;
};

function createProvider<TProps>(
    Component: React.ComponentType<React.PropsWithChildren<TProps>>,
    props?: Omit<TProps, 'children'>,
): ComposeContextProvider<TProps> {
    return {
        Component,
        props,
    };
}

export function buildContext<TContextValue, Tname extends `use${string}`>(contextName: Tname) {
    const context = React.createContext<TContextValue | undefined>(undefined);
    context.displayName = contextName;
    return {
        createProvider: <T extends TContextValue>(value: T) => {            
            return createProvider(context.Provider, { value: value });
        },
        [contextName]: () => {
            const value = React.useContext(context);
            if (value === undefined) {
                throw new Error(`${contextName} must be used within a Context Provider`);
            }
            return value;
        },
    } as {
        // Component: React.Provider<TContextValue>;
        // props: TContextValue | undefined;
        createProvider: <T extends TContextValue>(value: T) => ComposeContextProvider<T>;
    } & Record<Tname, () => TContextValue>;
}

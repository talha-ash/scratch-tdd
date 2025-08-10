declare const __brand: unique symbol;
type Brand<T> = { [__brand]: T };
export type Branded<T, TBrand> = T & Brand<TBrand>;

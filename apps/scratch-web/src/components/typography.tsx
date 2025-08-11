import { cn } from './lib/utils';
import type { ComponentProps } from 'react';

export const H1 = (props: ComponentProps<'h1'>) => (
    <h1 {...props} className={cn('text-h1', props.className)}>
        {props.children}
    </h1>
);
export const H2 = (props: ComponentProps<'h2'>) => (
    <h2 {...props} className={cn('text-h2', props.className)}>
        {props.children}
    </h2>
);
export const H3 = (props: ComponentProps<'h3'>) => (
    <h3 {...props} className={cn('text-h3', props.className)}>
        {props.children}
    </h3>
);
export const H4 = (props: ComponentProps<'h4'>) => (
    <h4 {...props} className={cn('text-h4', props.className)}>
        {props.children}
    </h4>
);
export const H5 = (props: ComponentProps<'h5'>) => (
    <h5 {...props} className={cn('text-h5', props.className)}>
        {props.children}
    </h5>
);
export const TextCardItem = (props: ComponentProps<'h1'>) => (
    <h5 {...props} className={cn('text-card-item', props.className)}>
        {props.children}
    </h5>
);
export const TextLead = (props: ComponentProps<'p'>) => (
    <p {...props} className={cn('text-lead', props.className)}>
        {props.children}
    </p>
);
export const TextBody = (props: ComponentProps<'p'>) => (
    <p {...props} className={cn('text-body', props.className)}>
        {props.children}
    </p>
);
export const TextButton = (props: ComponentProps<'h1'>) => (
    <h1 {...props} className={cn('text-button text-primary', props.className)}>
        {props.children}
    </h1>
);
export const TextGrey = (props: ComponentProps<'p'>) => (
    <p {...props} className={cn('text-grey text-grey-color', props.className)}>
        {props.children}
    </p>
);
export const TextSubtle = (props: ComponentProps<'p'>) => (
    <p {...props} className={cn('text-subtle text-subtle-color', props.className)}>
        {props.children}
    </p>
);
export const Caption = (props: ComponentProps<'p'>) => (
    <p {...props} className={cn('text-caption text-caption-color', props.className)}>
        {props.children}
    </p>
);

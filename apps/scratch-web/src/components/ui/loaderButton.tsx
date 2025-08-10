import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader2Icon } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { buttonVariants } from './button';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '~/components/lib/utils';

function LoaderButton({
    className,
    variant,
    size,
    width,
    loading,
    asChild = false,
    children,
    onClick,
    strictPaused,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
        loading?: boolean;
        strictPaused?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';
    const canClickRef = useRef(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (strictPaused) {
            if (onClick && !canClickRef.current) {
                onClick(event);
            }
            canClickRef.current = true;
        } else if (onClick) {
            onClick(event);
        }
    };

    useMemo(() => {
        if (strictPaused) {
            if (canClickRef.current == true && !loading) {
                canClickRef.current = false;
            }
        }
    }, [loading]);

    if (loading) {
        return (
            <Comp
                data-slot="button"
                className={cn(buttonVariants({ variant, size, width, className }), 'cursor-wait')}
                disabled
                {...props}
            >
                {children}
                <Loader2Icon className="animate-spin" />
            </Comp>
        );
    }
    return (
        <Comp
            data-slot="button"
            onClick={handleClick}
            className={cn(buttonVariants({ variant, size, width, className }))}
            {...props}
        >
            {children}
        </Comp>
    );
}

export { LoaderButton, buttonVariants };

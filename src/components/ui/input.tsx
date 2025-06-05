import * as React from 'react';

import { cn } from '~/components/lib/utils';
import { EyeIcon, EyeOffIcon, type LucideIcon } from 'lucide-react';
import { TextSubtle } from '../typography';

type LabelPosition = 'top' | 'left';

export type InputProps =
    | (React.ComponentProps<'input'> & {
          Icon: LucideIcon;
          labelText?: undefined;
          labelPosition?: undefined;
          type?: undefined;
          error?: string;
      })
    | (React.ComponentProps<'input'> & {
          Icon: undefined;
          labelText: string;
          labelPosition: LabelPosition;
          type?: React.ComponentProps<'input'>['type'];
          error?: string;
      })
    | (React.ComponentProps<'input'> & {
          Icon?: undefined;
          labelText?: undefined;
          labelPosition?: undefined;
          type?: React.ComponentProps<'input'>['type'];
          error?: string;
      });

const Input = (props: InputProps) => {
    const { Icon, error, labelText, labelPosition, className, type, ...rest } = props;
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputClasses = cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
        'dark:bg-input/30',
        'border-input',
        'flex h-9 w-full min-w-0 bg-transparent px-1 py-1 text-base',
        'transition-[color,box-shadow] outline-none',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
        'border-b',
        'focus-visible:border-b-primary',
        'aria-invalid:border-b-destructive',
        error && 'focus-visible:border-b-destructive border-b-destructive',
        // 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        Icon && 'pl-10',
        type === 'password' && '!text-2xl',
        className,
    );

    const InputComponent = (
        <div className={cn('relative', 'w-full')}>
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon size={16} className="text-muted-foreground" />
                </div>
            )}

            <input
                type={type === 'password' && showPassword ? 'text' : type}
                className={inputClasses}
                aria-invalid={!!error}
                {...rest}
            />
            {error ? <p className="mt-1 text-destructive text-sm">{error}</p> : null}
            {type === 'password' ? (
                <InputPasswordIcon
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                />
            ) : null}
        </div>
    );

    if (labelText) {
        if (labelPosition == 'left') {
            return (
                <div className="w-full flex flex-row">
                    <TextSubtle className={cn('mt-3 ml-1 mr-3 block', error && 'text-destructive')}>
                        {labelText}
                    </TextSubtle>
                    {InputComponent}
                </div>
            );
        }

        return (
            <div className="w-full">
                <TextSubtle className={cn('ml-1 block', error && 'text-destructive')}>
                    {labelText}
                </TextSubtle>
                {InputComponent}
            </div>
        );
    }
    return InputComponent;
};

const InputPasswordIcon = ({
    showPassword,
    togglePasswordVisibility,
}: {
    showPassword: boolean;
    togglePasswordVisibility: () => void;
}) => {
    return (
        <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
            {showPassword ? (
                <EyeOffIcon
                    className="cursor-pointer"
                    onClick={togglePasswordVisibility}
                    size={20}
                />
            ) : (
                <EyeIcon className="cursor-pointer" onClick={togglePasswordVisibility} size={20} />
            )}
        </div>
    );
};
export { Input };

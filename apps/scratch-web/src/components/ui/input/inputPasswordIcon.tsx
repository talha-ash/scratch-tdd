import { EyeIcon, EyeOffIcon } from 'lucide-react';

export const InputPasswordIcon = ({
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

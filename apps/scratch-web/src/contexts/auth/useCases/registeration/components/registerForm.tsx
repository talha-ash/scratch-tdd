import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useRegister } from '../useRegistration';

export const RegisterForm = () => {
    const { registerForm } = useRegister();
    return (
        <div className="w-full max-w-sm space-y-6">
            <div className="text-center lg:text-left space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-nunito">
                    Welcome Back!
                </h1>
                <p className="text-sm text-gray-600 font-nunito">Please login to continue.</p>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    registerForm.handleSubmit();
                }}
            >
                <div className="space-y-6 mt-6 mb-4">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">Username</label>
                        <div className="relative">
                            <registerForm.Field name="username">
                                {(field) => (
                                    <Input
                                        data-testid="username"
                                        type="username"
                                        name="username"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={
                                            field.state.meta.isValid
                                                ? ''
                                                : field.state.meta.errors[0]?.message
                                        }
                                    />
                                )}
                            </registerForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">
                            Email address
                        </label>
                        <div className="relative">
                            <registerForm.Field name="email">
                                {(field) => (
                                    <Input
                                        data-testid="email"
                                        type="email"
                                        name="email"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={
                                            field.state.meta.isValid
                                                ? ''
                                                : field.state.meta.errors[0]?.message
                                        }
                                    />
                                )}
                            </registerForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">Password</label>
                        <div className="relative">
                            <registerForm.Field name="password">
                                {(field) => {
                                    return (
                                        <Input
                                            data-testid="password"
                                            type="password"
                                            name="password"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={
                                                field.state.meta.isValid
                                                    ? ''
                                                    : field.state.meta.errors[0]?.message
                                            }
                                        />
                                    );
                                }}
                            </registerForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">
                            Password Confirm
                        </label>
                        <div className="relative">
                            <registerForm.Field name="passwordConfirm">
                                {(field) => {
                                    return (
                                        <Input
                                            data-testid="passwordConfirm"
                                            type="password"
                                            name="passwordConfirm"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={
                                                field.state.meta.isValid
                                                    ? ''
                                                    : field.state.meta.errors[0]?.message
                                            }
                                        />
                                    );
                                }}
                            </registerForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>
                </div>

                <Button width="full" size={'lg'} type={'submit'} data-testid="submit-button">
                    Sign Up
                </Button>
            </form>
            <div className="text-center space-y-2 pt-4">
                <p className="text-sm text-gray-500 font-nunito">Already have an account?</p>
                <a
                    href="/login"
                    data-testid="login-account"
                    className="block text-base font-bold text-green-500 font-nunito hover:text-green-600 transition-colors"
                >
                    Login Here
                </a>
            </div>
        </div>
    );
};

import { Button } from '~/components/ui/button';
import { useLogin } from '../useCases/login/useLogin';

export const LoginForm = () => {
    const { formState, setFormState, loginFormSubmit } = useLogin();
    return (
        <div className="w-full max-w-sm space-y-6">
            <div className="text-center lg:text-left space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-nunito">
                    Welcome Back!
                </h1>
                <p className="text-sm text-gray-600 font-nunito">Please login to continue.</p>
            </div>

            <div className="space-y-6 mt-8">
                <div className="space-y-2">
                    <label className="block text-sm text-gray-500 font-nunito">Email address</label>
                    <div className="relative">
                        <input
                            data-testid="email"
                            type="email"
                            name="email"
                            // defaultValue="user@email.com"
                            className="w-full bg-transparent border-none outline-none text-gray-900 text-base font-nunito pb-2 focus:text-green-600 transition-colors"
                            value={formState.email}
                            onChange={({ target }) =>
                                setFormState({ ...formState, [target.name]: target.value })
                            }
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm text-gray-500 font-nunito">Password</label>
                    <div className="relative">
                        <input
                            data-testid="password"
                            type="password"
                            name="password"
                            // defaultValue="●●●●●●●●"
                            className="w-full bg-transparent border-none outline-none text-gray-900 text-base font-nunito pb-2 focus:text-green-600 transition-colors"
                            value={formState.password}
                            onChange={({ target }) =>
                                setFormState({ ...formState, [target.name]: target.value })
                            }
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <a
                    href="#forgot-password"
                    className="text-sm text-gray-600 font-nunito hover:text-green-600 transition-colors"
                >
                    Forgot password?
                </a>
            </div>

            <Button
                width="full"
                size={'lg'}
                type={'submit'}
                data-testid="submit-button"
                onClick={loginFormSubmit}
            >
                Login
            </Button>

            <div className="text-center space-y-2 pt-4">
                <p className="text-sm text-gray-500 font-nunito">New to Scratch?</p>
                <a
                    href="#create-account"
                    className="block text-base font-bold text-green-500 font-nunito hover:text-green-600 transition-colors"
                >
                    Create Account Here
                </a>
            </div>
        </div>
    );
};

// function getUsers(): ResultAsync<IHttpResponse<User[]>, AxiosErrorType> {
//     const apiClient = new AxiosHttpClient('https://jsonplaceholder.typicode.com');

//     return apiClient.get<User[]>('/userss');
// }

//  const query = useQuery<User[], AxiosErrorType>({
//         queryKey: ['test'],
//         retry: false,
//         queryFn: async () => {
//             const users = await getUsers();

//             if (users.isOk()) {
//                 return users.value.data;
//             } else {
//                 return Promise.reject(users.error);
//             }
//         }, // either data, err
//         // queryFn: async () => await getUsers(),all as data either ok, err
//     });

//     if (query.error) {
//         console.log(query.error);
//     }
//     if (query.data) {
//         const result = query.data;
//         console.log(result);
//     }

import { useCreateIngredient } from '../useCreateIngredient';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export const CreateIngredientForm = () => {
    const { createIngredientForm } = useCreateIngredient();

    return (
        <div className="w-full max-w-sm space-y-6">
            <div className="text-center lg:text-left space-y-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-nunito">
                    Create Ingredient.
                </h1>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createIngredientForm.handleSubmit();
                }}
            >
                <div className="space-y-6 mt-6 mb-4">
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">Name</label>
                        <div className="relative">
                            <createIngredientForm.Field name="name">
                                {(field) => (
                                    <Input
                                        data-testid="name"
                                        name="name"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={
                                            field.state.meta.isValid
                                                ? ''
                                                : field.state.meta.errors[0]?.message
                                        }
                                    />
                                )}
                            </createIngredientForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">
                            Description
                        </label>
                        <div className="relative">
                            <createIngredientForm.Field name="description">
                                {(field) => (
                                    <Input
                                        data-testid="description"
                                        name="description"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        error={
                                            field.state.meta.isValid
                                                ? ''
                                                : field.state.meta.errors[0]?.message
                                        }
                                    />
                                )}
                            </createIngredientForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm text-gray-500 font-nunito">Image</label>
                        <div className="relative">
                            <createIngredientForm.Field name="imageFile">
                                {(field) => (
                                    <Input
                                        data-testid="imageFile"
                                        name="imageFile"
                                        type="file"
                                        onChange={(e) => field.handleChange(e.target.files![0])}
                                        error={
                                            field.state.meta.isValid
                                                ? ''
                                                : field.state.meta.errors[0]?.message
                                        }
                                    />
                                )}
                            </createIngredientForm.Field>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
                        </div>
                    </div>
                </div>

                <Button width="full" size={'lg'} type={'submit'} data-testid="submit-button">
                    Save
                </Button>
            </form>
        </div>
    );
};

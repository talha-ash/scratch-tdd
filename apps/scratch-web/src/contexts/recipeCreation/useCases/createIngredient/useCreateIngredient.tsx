import { useNavigate } from '@tanstack/react-router';
import { CreateRecipeContext } from 'core';
import type {RecipeCreationDomainTypes} from "core"
import { useToastNotification } from '~/shared/infrastructure/toast/toastProvider';

export const useCreateIngredient = () => {
    const { successToast, errorToast } = useToastNotification();
    const createIngredientMutation =
        CreateRecipeContext.CreateIngredientUseCase.CreateIngredientHooks.useCreateIngredientMutation();
    const { createIngredientForm } =
        CreateRecipeContext.CreateIngredientUseCase.CreateIngredientHooks.useCreateIngredientFormHandler(
            createIngredientFormSubmit,
        );
    const navigate = useNavigate();

    function createIngredientFormSubmit(payload: RecipeCreationDomainTypes.IngredientSchemaType) {
        createIngredientMutation.mutation.mutate(payload, {
            onSuccess: () => {
                navigate({ to: '/' });
                successToast('Create Ingredient Successfully');
            },
            onError: (error) => {
                errorToast(error.message as string);
            },
        });
    }

    return { createIngredientForm };
};

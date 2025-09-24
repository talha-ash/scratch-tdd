import { useForm } from '@tanstack/react-form';

import {
    getIngredientSchema,
    type IngredientSchemaType,
} from '~core/contexts/recipeCreation/domain/ingredient';

export const useCreateIngredientFormHandler = (
    createIngredientFormSubmit: (value: IngredientSchemaType) => void,
) => {
    const createIngredientForm = useForm({
        defaultValues: {
            name: '',
            description: '',
            imageFile: null as unknown as File,
        },
        validators: {
            onChange: getIngredientSchema(),
        },
        onSubmit: ({ value }) => {
            createIngredientFormSubmit(value);
        },
    });

    return { createIngredientForm };
};

import { useForm } from '@tanstack/react-form';

import {
    IngredientSchema,
    type IngredientSchemaType,
} from '~core/contexts/recipeCreation/domain/ingredient';

export const useCreateIngredientFormHandler = (
    createIngredientFormSubmit: (value: IngredientSchemaType) => void,
) => {
    const createIngredientForm = useForm({
        defaultValues: {
            name: '',
            description: '',
            image_file: '',
        },
        validators: {
            onChange: IngredientSchema,
        },
        onSubmit: ({ value }) => {
            createIngredientFormSubmit(value);
        },
    });

    return { createIngredientForm };
};

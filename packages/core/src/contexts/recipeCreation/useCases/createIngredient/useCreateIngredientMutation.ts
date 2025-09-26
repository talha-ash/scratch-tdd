import { useMutation } from '@tanstack/react-query';
import { createIngredient } from './createIngredientAdapter';
import type { IngredientSchemaType } from '../../domain/ingredient';

export const useCreateIngredientMutation = () => {
    const mutation = useMutation({
        mutationKey: ['create-ingredient'],
        mutationFn: async (newIngredient: IngredientSchemaType) => {
            const result = await createIngredient(newIngredient);
            if (result.isErr()) {
                return Promise.reject(result.error);
            }
            return result.value;
        },
    });

    return { mutation };
};

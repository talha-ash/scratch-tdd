import * as v from 'valibot';

export interface Ingredient {
    id: string;
    name: string;
    description: string;
    image_url: string;
    is_verified: boolean;
}

export const IngredientSchema = v.object({
    name: v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
    description: v.pipe(v.string(), v.minLength(6), v.maxLength(100)),
    image_file: v.string(),
});

export type IngredientSchemaType = v.InferInput<typeof IngredientSchema>;

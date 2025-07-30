import { Obj } from 'immutes';
import { err, ok } from 'neverthrow';
import * as v from 'valibot';

export const IngredientSchema = v.object({
    name: v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
    description: v.pipe(v.string(), v.minLength(6), v.maxLength(100)),
    image_url: v.string(),
    is_verified: v.boolean(),
});

export type Ingredient = v.InferInput<typeof IngredientSchema>;

export function createIngredient(ingredient: Ingredient) {
    const result = v.safeParse(IngredientSchema, ingredient);
    if (result.success) {
        return ok(Obj.newObj(ingredient));
    }
    const flatErrors = v.flatten<typeof IngredientSchema>(result.issues);
    return err(Obj.newObj(flatErrors.nested!));
}

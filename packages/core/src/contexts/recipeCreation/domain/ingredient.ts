import * as v from 'valibot';
import {
    CREATE_INGREDIENT_REQUIRED_FILE,
    CREATE_INGREDIENT_IMAGE_FORMAT,
    CREATE_INGREDIENT_IMAGE_SIZE,
    CREATE_INGREDIENT_INVALID_NAME,
    CREATE_INGREDIENT_INVALID_DESCRIPTION,
} from '../constants/textConstants';

export interface Ingredient {
    id: string;
    name: string;
    description: string;
    image_url: string;
    is_verified: boolean;
}

export function getIngredientSchema() {
    return v.object({
        name: v.message(
            v.pipe(v.string(), v.minLength(3), v.maxLength(20)),
            CREATE_INGREDIENT_INVALID_NAME,
        ),
        description: v.message(
            v.pipe(v.string(), v.minLength(6), v.maxLength(100)),
            CREATE_INGREDIENT_INVALID_DESCRIPTION,
        ),
        imageFile: v.pipe(
            v.file(CREATE_INGREDIENT_REQUIRED_FILE),
            v.mimeType(['image/jpeg', 'image/png'], CREATE_INGREDIENT_IMAGE_FORMAT),
            v.maxSize(1024 * 1024 * 10, CREATE_INGREDIENT_IMAGE_SIZE),
        ),
    });
}

export type IngredientSchemaType = v.InferInput<ReturnType<typeof getIngredientSchema>>;

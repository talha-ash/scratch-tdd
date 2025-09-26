import { describe, expect, it } from 'vitest';
import * as v from 'valibot';
import { getIngredientSchema } from '../ingredient';
import {
    CREATE_INGREDIENT_IMAGE_FORMAT,
    CREATE_INGREDIENT_INVALID_DESCRIPTION,
    CREATE_INGREDIENT_INVALID_NAME,
    CREATE_INGREDIENT_REQUIRED_FILE,
} from '../../constants/textConstants';

const imageContent =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // A tiny transparent PNG

const IngredientImage = new File([imageContent], 'test-image.png', { type: 'image/png' });

describe('Create Ingredient Schema validation', () => {
    it('validate with valid value', () => {
        const schema = getIngredientSchema();

        const result = v.safeParse(schema, {
            name: 'Potato',
            description: 'Potato good source of protein',
            imageFile: IngredientImage,
        });

        expect(result.success).toBe(true);
    });

    it('validate invalid value', () => {
        const schema = getIngredientSchema();
        const InvalidIngredientImage = new File([imageContent], 'test-image.webp', {
            type: 'image/webp',
        });

        const result = v.safeParse(schema, {
            name: 'Po',
            description: 'Potat',
            imageFile: InvalidIngredientImage,
        });

        if (result.issues?.length) {
            expect(result.issues[0].message).toBe(CREATE_INGREDIENT_INVALID_NAME);
            expect(result.issues[1].message).toBe(CREATE_INGREDIENT_INVALID_DESCRIPTION);
            expect(result.issues[2].message).toBe(CREATE_INGREDIENT_IMAGE_FORMAT);
        }
    });

    it('validate file required', () => {
        const schema = getIngredientSchema();

        const result = v.safeParse(schema, {
            name: 'Potato',
            description: 'Potato is good',
            imageFile: '',
        });

        if (result.issues?.length) {
            expect(result.issues[0].message).toBe(CREATE_INGREDIENT_REQUIRED_FILE);
        }
    });
});

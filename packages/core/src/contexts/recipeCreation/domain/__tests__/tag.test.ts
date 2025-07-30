import { describe, expect, it } from 'vitest';
import { createTag } from '../tag';

describe('tag creation', () => {
    it('should create an tag', () => {
        const newIngredient = createTag({
            name: 'salt',
        });
        if (newIngredient.isOk()) {
            expect(newIngredient.value.name).toBe('salt');
        }
    });

    it('short name error on create an tag', () => {
        const newIngredient = createTag({
            name: 'sa',
        });
        if (newIngredient.isErr()) {
            expect(newIngredient.error.name![0]).toBe(
                'Invalid length: Expected >=3 but received 2',
            );
        }
    });
});

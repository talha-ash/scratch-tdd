import { describe, expect, it } from 'vitest';
import { convertNestedErrorMessage } from '..';

describe('http error conversion', () => {
    it('convert successfully', () => {
        const message = 'User Not Found';

        const result = convertNestedErrorMessage(message);

        expect(result.message).toEqual(message);
    });

    it('convert successfully nested errors', () => {
        const message = {
            errors: { email: ['User Not Found'], password: ['Password is not good'] },
        };

        const result = convertNestedErrorMessage(message);

        expect(result.message).toEqual(['User Not Found', 'Password is not good']);
    });
});

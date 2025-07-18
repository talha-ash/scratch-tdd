import { describe, expect, it } from 'vitest';
import { getLoginSchema } from '../loginService';
import * as v from 'valibot';
import { EMAIL_IS_INVALID, PASSWORD_IS_INCORRECT } from 'src/contexts/auth/constants/textConstant';

describe('Login validation', () => {
    it('validate with valid value', () => {
        const schema = getLoginSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail.com',
            password: 'password12345',
        });

        expect(result.success).toBe(true);
    });

    it('validate wrong password length', () => {
        const schema = getLoginSchema();

        const result = v.safeParse(schema, {
            email: 'john@gmail',
            password: 'passwor',
        });

        if (result.issues?.length) {
            expect(result.issues[0].message).toBe(EMAIL_IS_INVALID);
            expect(result.issues[1].message).toBe(PASSWORD_IS_INCORRECT);
        }
    });
});

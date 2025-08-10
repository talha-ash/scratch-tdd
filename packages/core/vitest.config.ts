import { defineConfig } from 'vitest';

export default defineConfig({
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['**/*.int.test.ts'],
    },
});

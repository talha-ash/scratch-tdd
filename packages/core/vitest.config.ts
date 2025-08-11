import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
    test: {
        include: ['src/**/*.test.ts'],
        exclude: ['**/*.int.test.ts'],
    },
    resolve: {
        alias: {
            '~core': path.resolve(__dirname, 'src/'),
        },
    },
});

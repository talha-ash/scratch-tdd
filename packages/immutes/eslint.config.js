import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import path from 'path';

const tsConfigs = tseslint.config(
    ...tseslint.configs.recommended,

    {
        files: ['/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: path.dirname('.'),
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': [
                'error',
                {
                    ignoreRestArgs: true,
                    fixToUnknown: false,
                },
            ],
        },
    },
);

export default defineConfig([
    globalIgnores(['dist/*', '**/*.test.ts', '**/*.test.tsx']),
    {
        files: ['/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
    },
    {
        files: ['/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: { globals: globals.browser },
    },
    eslint.configs.recommended,
    ...tsConfigs,
]);

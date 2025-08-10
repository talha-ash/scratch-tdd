import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
// import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores([
        'coverage',
        '**/public',
        '**/dist',
        '**.storybook',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'dist/*',
        '**/*.test.ts',
        '**/*.test.tsx',
    ]),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: globals.browser },
    },
    tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-react': 'off',
        },
    },
    // {
    //     files: ['**/*.css'],
    //     plugins: { css },
    //     language: 'css/css',
    //     extends: ['css/recommended'],
    // },
]);

import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
// import css from '@eslint/css';
import eslint from '@eslint/js';
import { globalIgnores } from 'eslint/config';

export default tseslint.config(
    globalIgnores([
        'coverage',
        '**/public',
        '**/dist',
        '**.storybook',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'dist/*',
        // '**/*.test.ts',
        // '**/*.test.tsx',
    ]),

    eslint.configs.recommended,
    tseslint.configs.recommended,
    // {
    //     ignores: [
    //         'dist/**/*.ts',
    //         'dist/**',
    //         'cypress/**',
    //         'cypress.config.ts',
    //         '**/*.mjs',
    //         '**/*.js',
    //     ],
    // },
    {
        files: ['*.config.ts', 'vite.config.ts', 'cypress/**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parserOptions: {
                project: ['./tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.test.ts',
            '**/*.test.tsx',],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                project: ['./tsconfig.test.json'],
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions:{
                projectService: true
            }
        },
    },
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
);

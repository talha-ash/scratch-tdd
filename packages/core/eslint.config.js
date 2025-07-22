// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';
import pluginQuery from '@tanstack/eslint-plugin-query';
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
// import css from "@eslint/css";
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
    pluginReact.configs.flat.recommended,
    pluginReact.configs.flat['jsx-runtime'],
    ...pluginQuery.configs['flat/recommended'],
    ...storybook.configs['flat/recommended'],
    // eslintNeverThrow.configs.recommended,
    // { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);

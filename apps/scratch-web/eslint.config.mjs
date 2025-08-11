import { tanstackConfig } from '@tanstack/eslint-config';

import tseslint from 'typescript-eslint';
import baseEslintConfigs from '../../eslint.config.mjs';

export default tseslint.config([
    ...baseEslintConfigs,
    ...tanstackConfig,
    {
        files: ['*.config.ts', 'cypress/**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unnecessary-condition': 'off',
        },
    },
]);

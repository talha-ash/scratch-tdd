import globals from 'globals';
import tseslint from 'typescript-eslint';
import baseEslintConfigs from '../../eslint.config.mjs';
export default tseslint.config([
    ...baseEslintConfigs,
    {
        files: ['**/*.test.ts', '**/*.test.tsx'],
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
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]);

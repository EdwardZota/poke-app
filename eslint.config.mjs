// @ts-check

import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',

            eqeqeq: ['error', 'always'],
            'no-console': 'warn',
            curly: ['error', 'all'],
            '@typescript-eslint/consistent-type-imports': 'off',

            '@typescript-eslint/member-delimiter-style': ['error', {
                multiline: { delimiter: 'none', requireLast: false },
                singleline: { delimiter: 'comma', requireLast: false },
            }],
            '@typescript-eslint/semi': ['error', 'never'],
            '@typescript-eslint/quotes': ['error', 'double'],
        },
    },
    prettierConfig,
)

import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** Конфигурация ESLint (flat config) */
export default tseslint.config(
    { ignores: ['dist', 'coverage'] },
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
        languageOptions: { ecmaVersion: 2023, globals: globals.browser },
        plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            curly: ['error', 'all'],
            quotes: ['error', 'single', { avoidEscape: true }],
            'max-len': ['error', { code: 120, ignoreUrls: true, ignoreStrings: true }],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
            ],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
        },
    },
);

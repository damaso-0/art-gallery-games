import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    ...eslintPluginAstro.configs.recommended,
    eslintConfigPrettier,
    {
        plugins: ['prettier'],
        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': 'warn',
            indent: ['error', 2],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'only-multiline'],
        },
    },
]

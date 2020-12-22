module.exports = {
    plugins: ['@typescript-eslint', 'prettier', 'jsdoc'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:jsdoc/recommended',
    ],
    rules: {},
    overrides: [
        {
            files: ['src/*/*'],
            rules: {
                'max-lines': 'off',
                'max-nested-callbacks': 'off',
                'max-statements': 'off',
            },
        },
    ],
    settings: {
        node: {
            extensions: ['.ts', '.json'],
        },
    },
};

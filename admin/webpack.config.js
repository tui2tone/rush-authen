module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        ident: 'postcss',
                        syntax: 'postcss-scss',
                        plugins: [
                            require('postcss-import')({
                                addModulesDirectories: ["src"]
                            }),
                            require('postcss-url'),
                            require('tailwindcss')
                        ],
                    },
                },
            },
        ],
    },
};
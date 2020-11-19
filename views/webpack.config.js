const path = require('path');

module.exports = {
    entry: {
        login: './src/login.ts'
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
    }
};
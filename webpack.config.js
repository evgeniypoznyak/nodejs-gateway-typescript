const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const common = {
    devtool: 'cheap-module-source-map',
    module: {
        //
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
            },
        ],

    }
};

const serverConfig = {
    ...common,
    entry: [ '@babel/polyfill', './src/app.js'],
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: __dirname,
        filename: 'server.js',
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: 'false',
        }),
    ],
};

module.exports = [serverConfig];

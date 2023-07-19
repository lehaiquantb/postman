const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { exec } = require('child_process');
const postwomanPath = path.join(__dirname, './src/lib/postwoman.ts');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        postwoman: postwomanPath,
    },
    output: {
        path: path.join(__dirname, './lib'), // Thư mục chứa file được build ra
        filename: '[name].bundle.js', // Tên file được build ra
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                },
                            ],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/, // Sử dụng style-loader, css-loader cho file .css
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: require.resolve('./src/utils.ts'),
            //     use: {
            //         loader: 'expose-loader',
            //         options: 'myGlobalVariablex', // The name of the global variable you want to expose
            //     },
            // },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        // alias: {
        //     utils1: path.resolve(__dirname, './src/utils'), // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
        // },
        fallback: {
            fs: false,
            tls: false,
            net: false,
            path: false,
            zlib: false,
            http: false,
            http2: false,
            https: false,
            stream: false,
            crypto: false,
            'crypto-browserify': require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
        },
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './js/index.html',
        // }),
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            _: 'lodash',
        }),
        // new webpack.ProvidePlugin({
        //     utils1: 'utils1',
        // }),
        // new webpack.ProvidePlugin({
        //     myGlobalVariable: path.resolve(__dirname, './src/utils.ts'),
        // }),
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap(
                    'AfterEmitPlugin',
                    (compilation) => {
                        exec(
                            `node ${path.resolve(
                                __dirname,
                                './bin/postBuild.js',
                            )} --mode development`,
                            (err, stdout, stderr) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(stdout);
                                }
                            },
                        );
                    },
                );
            },
        },
    ],
    externals: {
        // utils1: {},
        // lodash: `{
        //     serverUrl: '${env.server}',
        //     cordovaBuild: '${env.cordova}',
        //   }`,
    },
};

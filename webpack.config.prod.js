const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { exec } = require('child_process');
const postmanPath = path.join(__dirname, './src/lib/postman.ts');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        postman: postmanPath,
    },
    output: {
        path: path.join(__dirname, './scripts'), // Thư mục chứa file được build ra
        filename: '[name].min.js', // Tên file được build ra
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
    },
    // Chứa các plugins sẽ cài đặt trong tương lai
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: './js/index.html',
        // }),
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
                            )} --mode production`,
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

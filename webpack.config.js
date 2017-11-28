const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const d3 = require("d3");

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            './src/index'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'index.html'),
                to: path.join(__dirname, 'dist'),
            },
            {
                from: path.join(__dirname, 'src/assets/favicon.ico'),
                to: path.join(__dirname, 'dist'),
            }
        ]),
        new UglifyJSPlugin()
    ],
    resolve: {
        alias: {
            d3: 'd3/build/d3.js'
        }
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: ['file-loader?limit=1000&name=[md5:hash:base64:10].[ext]']
            }
        ]
    }
}

// Require dotenv for env variables
require('dotenv').config();

// Package to handle paths
// const path = require('path');
import path from 'path'
// Vue loading plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Import Webpack
// import webpack from 'webpack'

// Copy WP plugin
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// Front end dep list
// const Assets = require('./assets');
// Loading css extract plugin
const MiniExtractCssPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './client/index.js',
    output: {
        filename: 'js/index.js', // outputfile
        publicPath: '/', // only to serve files virtually
        path: path.resolve(__dirname, 'server/public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniExtractCssPlugin.loader, // Extrae css
                    'css-loader', // Permite compilar css
                ],
            }
        ]
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: Assets.map(asset => {
        //         return {
        //             from: path.resolve(__dirname, `./node_modules/${asset}`),
        //             to: path.resolve(__dirname, './server/public/vendor')
        //         };
        //     })
        // }),
        new VueLoaderPlugin(),
        new MiniExtractCssPlugin({
            filename: 'styles/index.css',
        }),
    ]
}
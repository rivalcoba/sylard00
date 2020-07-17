// Require dotenv for env variables
require('dotenv').config();
// Package to handle paths
const path = require('path');
// Import Webpack
const webpack = require('webpack');
// Copy WP plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Front end dep list
const Assets = require('./assets');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './client/index.js',
    output: {
        filename: 'index.js', // outputfile
        publicPath: '/', // only to serve files virtually
        path: path.resolve(__dirname, 'server/public')
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: Assets.map(asset => {
                return {
                    from: path.resolve(__dirname, `./client/node_modules/${asset}`),
                    to: path.resolve(__dirname, './server/public/vendor')
                };
            })
        })
    ]
}
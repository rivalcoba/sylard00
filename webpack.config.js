// Require dotenv for env variables
require('dotenv').config();
// Package to handle paths
const path = require('path');
// Import Webpack
const webpack = require('webpack');
// Loading css extract plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './client/index.js',
    output: {
        filename: 'index.js', // outputfile
        publicPath: '/', // only to serve files virtually
        path: path.resolve(__dirname, 'server/public')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extrae css
                    //'style-loader', // Carga css con directivas tailwind
                    'css-loader' // Permite compilar css
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'stylesheets/app.css',
    })]
}
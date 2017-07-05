const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: '#cheap-module-eval-source-map',

    entry: {
        dev: [
            'webpack/hot/dev-server',
        ]
    },

    output: {
        path: path.join(process.cwd(), '/dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js',
        pathInfo: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        inline: true,
        hot: true
    }
});
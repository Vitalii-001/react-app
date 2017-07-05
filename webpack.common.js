const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const pkgBower = require('./package.json');

const baseHref = process.env.WP_BASE_HREF ? process.env.WP_BASE_HREF : '/';

module.exports = {

    entry: {
        'app': './src/App.jsx'
    },

    resolve: {
        root: path.join(__dirname, ''),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /jquery\.flot\.resize\.js$/,
            loader: 'imports?this=>window'
        }, {
            test: /\.js/,
            loader: 'imports?define=>false'
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loaders: ['react-hot']
        }, {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],
                compact: false
            }
        }, {
            test: /\.css$/,
            exclude: path.join(process.cwd(), '/app'),
            loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        }, {
            test: /\.css$/,
            include: path.join(process.cwd(), '/app'),
            loader: 'raw'
        }, {
            test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
            loader: 'url?prefix=font/&limit=10000'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=10000'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?outputStyle=expanded'
            // loader: 'style!css!rtlcss-loader!sass?outputStyle=expanded' // uncomment for RTL
        }]
        // , noParse: [/\.min\.js/]
    },

    resolveLoader: {
        alias: {
            'rtlcss-loader': path.join(__dirname, 'rtlcss-loader.js')
        }
    },

    devServer: {
        outputPath: path.join(__dirname, 'dist')
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor[hash:6].js'}),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            baseUrl: baseHref
        }),
        // new webpack.ResolverPlugin([
        //     // new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('package.json', ['main']),
        //     // new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        // ]),
        // new CopyWebpackPlugin([{
        //     from: 'img',
        //     to: 'img',
        //     context: path.join(__dirname, 'app')
        // }, {
        //     from: 'server',
        //     to: 'server',
        //     context: path.join(__dirname, 'app')
        // }, {
        //     from: 'fonts',
        //     to: 'fonts',
        //     context: path.join(__dirname, 'app')
        // }]),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        // https://github.com/moment/moment/issues/2979#issuecomment-189899510
        new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
        new webpack.DefinePlugin({
            WP_BASE_HREF: JSON.stringify(baseHref)
        })
    ]
};
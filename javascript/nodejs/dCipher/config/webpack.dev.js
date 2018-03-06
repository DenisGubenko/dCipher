var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var uglifyJsPlugin = require('uglifyjs-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

helpers.deleteFolderRecursive(helpers.root('dist'));

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ],

    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        unsafe_comps: true,
                        properties: true,
                        keep_fargs: false,
                        pure_getters: true,
                        collapse_vars: true,
                        unsafe: true,
                        warnings: false,
                        sequences: true,
                        dead_code: true,
                        drop_debugger: true,
                        comparisons: true,
                        conditionals: true,
                        evaluate: true,
                        booleans: true,
                        loops: true,
                        unused: true,
                        hoist_funs: true,
                        if_return: true,
                        join_vars: true,
                        drop_console: true
                    }
                }
            }),
        ]
    },
    
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
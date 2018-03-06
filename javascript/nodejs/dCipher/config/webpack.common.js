var webpack = require('webpack');
var helpers = require('./helpers');

var fs = require('fs');
var nodeModules = {};
fs.readdirSync(
    helpers.root('..', '..', '..', 'node_modules')
).filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
    entry: {
        'dcipher': helpers.root('src', 'main.ts')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dgram: 'empty',
        fs: 'empty',
        module: 'empty',
        child_process: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    target: 'node',
    externals: nodeModules
};
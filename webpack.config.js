var webpack = require('webpack');
var path    = require('path');

module.exports = {
    entry:  './src/app.js',
    output: {
        path:       path.resolve(__dirname, './dist'),
        filename:   'bundle.js'
    },

    module: {
        rules: [
            // Read css files on webpack with css-loader
            // And load he with style-loader
            {
                test: /\.css$/, 
                // Warning! Plugins working right to left
                use: [
                    'style-loader', // Injecting in to HTML
                    'css-loader' // Piping css to bundle.js
                    ]
            }
        ]
    }
}
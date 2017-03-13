var webpack         = require('webpack');
var path            = require('path');
var inPorduction    = (process.env.NODE_ENV === 'production');

let ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry:  {
        app: [
            './src/app.js',
            './src/sass/main.scss'
        ]
    },
    output: {
        path:       path.resolve(__dirname, './dist'),
        filename:   '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            // Read css files on webpack with css-loader
            // And load he with style-loader
            // {
            //     test: /\.css$/, 
            //     // Warning! Plugins working right to left
            //     use: [
            //         'style-loader', // Injecting in to HTML
            //         'css-loader' // Piping css to bundle.js
            //         ]
            // },

            // Compile and transoft js file 
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inPorduction,
        })
    ]
};

/**
 * Production envoverments
 */
if (inPorduction){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
};
var webpack             = require('webpack');
var path                = require('path');
var glob                = require('glob');
var inPorduction        = (process.env.NODE_ENV === 'production');

let ExtractTextPlugin   = require("extract-text-webpack-plugin");
let PurifyCSSPlugin     = require('purifycss-webpack');
let CleanWebpackPlugin  = require('clean-webpack-plugin');


module.exports = {
    entry:  {
        app: [
            './src/app.js',
            './src/sass/main.scss'
        ],
        vendor: 'jquery'
    },
    output: {
        path:       path.resolve(__dirname, './dist'),
        filename:   '[name].[chunkhash].js' // [chunkhash] - меняем только те файлы, которые были изменены в ./src
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                 // Extraxt css file
                use: ExtractTextPlugin.extract({
                     // Warning! Plugins working right to left
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(png|je?pg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]'
                }
            },

            // Compile and transofrm js file 
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),

        // This plugin remove unused selectors from you CSS
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inPorduction,
        }),

        new CleanWebpackPlugin(['dist'], {
            root: __dirname,
            verbose: true, 
            dry: false
        }),

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
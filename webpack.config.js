var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        common: ['./src/js/calendar.js'],
        calendar: './src/js/index.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract(['css-loader','postcss-loader','less-loader'])
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/js/*', 'dist/css/*']),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name : "common"
        }),
        new htmlWebpackPlugin({
            title: Date.now(),
            filename: 'index.html',
            template: './src/template.html'
        })
    ],
    devServer: {
       contentBase: path.resolve(__dirname,'dist'),
       open:true 
    },
    devtool: 'inline-source-map'
}
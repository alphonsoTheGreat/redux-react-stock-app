var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var baseConfig = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./build')
    },
    module: {
            rules: [
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query:{
                        plugins: ['transform-class-properties']
                    }
                }
            ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
          })
    ]
};

module.exports = baseConfig;
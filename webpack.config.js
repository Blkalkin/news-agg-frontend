const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const config = {
        entry: [
            path.resolve(__dirname, 'src', 'index.js'),
            path.resolve(__dirname, 'src', 'index.scss')
        ],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ['babel-loader'],
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { url: false }
                        },
                        'sass-loader',
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: 'index.html'
            })
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            open: true,
            historyApiFallback: true,
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map',
    };
    return config;
};

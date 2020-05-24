const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = env =>
  console.log(env) || {
    mode: env.mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          test: /\.css$/i,

          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        { test: /\.handlebars$/, test: /\.hbs$/, loader: 'handlebars-loader' },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Countries',
        filename: 'index.html',
        template: './src/index.html',
      }),
      new MiniCssExtractPlugin({ filename: '[name].css' }),
      new LodashModuleReplacementPlugin(),
    ],
    devServer: { contentBase: path.join(__dirname, 'dist'), port: 8081 },
    devtool: 'cheap-source-map',
  };

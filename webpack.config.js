const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const config = {
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    entry: './src/app',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          // Create index.html from template (see plugins)
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          // Compile scss
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            // MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: argv.mode === 'production' ? false : true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: argv.mode === 'production' ? false : true,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      // new MiniCssExtractPlugin({
      //   filename: 'style.css',
      // }),
    ],
  };

  return config;
};

const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: {
    main: resolve(__dirname, '../src'),
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'styled-components',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src')],
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|json)$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    alias: {
      config: join(__dirname, '..', 'config', 'production'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi], // Skip pre-minified libs
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'frontend-hipster-kit',
      favicon: 'assets/favicon.ico',
      template: 'webpack/template.html',
    }),
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true,
      },
      AppCache: false,
    }),
  ],
};

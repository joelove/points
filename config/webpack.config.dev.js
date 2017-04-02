var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');
var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
    alias: { 'react-native': 'react-native-web' }
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      use: [{ loader: 'eslint-loader' }],
      include: paths.appSrc,
    }],
    rules: [{
      exclude: [
        /\.html$/,
        /\.(js|jsx)(\?.*)?$/,
        /\.scss$/,
        /\.json$/,
        /\.svg$/
      ],
      use: [{
        loader: 'url-loader',
        options: {
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      }],
    }, {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      use: [{ loader: 'babel-loader' }],
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
      ],
    }, {
      test: /\.json$/,
      use: 'json'
    }, {
      test: /\.svg$/,
      use: [{
        loader: 'file-loader',
        options: {
          query: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      }],
    }]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var paths = require('./paths');
var getClientEnvironment = require('./env');
var publicPath = paths.servedPath;
var publicUrl = publicPath.slice(0, -1);
var env = getClientEnvironment(publicUrl);

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
    alias: {
      'react-native': 'react-native-web'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'eslint-loader' }],
        include: paths.appSrc
      }
    ],
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
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
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        use: [{ loader: 'babel-loader' }],

      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }],
      },
      {
        test: /\.svg$/,
        use: [{
          loader: 'file-loader',
          query: {
            name: 'static/media/[name].[hash:8].[ext]'
          },
      }],
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

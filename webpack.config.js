const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const outputDirectory = 'lib';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    },
      {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'        //Transforms JSX to javascript
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']     //load and bundle CSS files
    },
    {
      test: /\.(jpe?g|png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'       //Fonts and images are loaded through url-loader
    },
    {
      test : /\.(pdf)$/,
      loader : 'file-loader'
    }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    proxy: {
      
      '/api': 'http://localhost:5000'
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['lib']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
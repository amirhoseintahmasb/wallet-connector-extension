const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'wallet-connector-extention.js' // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply babel-loader to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  devtool: 'source-map', // Generate source maps
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Wallet Connector Extension', // Generates an HTML file with this title
    //   filename: 'index.html' // Output HTML file
    // })
  ],
  devServer: {
    contentBase: './dist',
    hot: true // Enable hot module replacement
  },
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "vm": require.resolve("vm-browserify")
    }
  },
  
};

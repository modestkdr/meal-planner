import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import { ComponentWalker } from './utils/ComponentWalker';

export default {
  context: __dirname + "/src",
  entry: [
    'webpack-dev-server/client?http://localhost:',
    'webpack/hot/dev-server',
    './App.jsx',
    './index.html'
  ],
  output: {
    filename: "./src/App.js",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin (),
    new webpack.NoErrorsPlugin (),
    new ExtractTextPlugin ("src/App.css", {
      allChunks: true
    })
  ],
  resolve: {
    root: ComponentWalker ('./src', 'absolute'),
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        exclude: path.resolve (__dirname, 'node_modules'),
        loaders: ["react-hot", "babel-loader"] },
      { test: /\.js$/,
        exclude: path.resolve (__dirname, 'node_modules'),
        loaders: ["react-hot", "babel-loader"] },
      { test: /\.html$/,
        loader: "file?name=[name].[ext]" },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract ('css') },
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract ('css!sass') },
      { test: /\.sass$/,
        loader: ExtractTextPlugin.extract('css!sass?indentedSyntax') },
      { test: /\.less$/,
        loader: ExtractTextPlugin.extract ('css!less') }
    ],
  }
}

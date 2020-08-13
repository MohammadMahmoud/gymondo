const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/server/app.ts'],
  mode: NODE_ENV,
  output: {
    filename: 'api.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  plugins: [],
  externals: [nodeExternals()],
};

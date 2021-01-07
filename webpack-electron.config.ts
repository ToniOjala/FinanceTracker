import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const config: webpack.Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module'],
  },
  entry: './src/electron/main.ts',
  target: 'electron-main',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/better-sqlite3/',
          to: 'app/node_modules/better-sqlite3/',
        },
      ]
    }),
    new Dotenv(),
  ],
  externals: {
    'better-sqlite3': 'commonjs better-sqlite3',
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'electron-main.js',
    publicPath: './',
  },
};

export default config;

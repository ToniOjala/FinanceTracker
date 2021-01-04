import path from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';

const config: webpack.Configuration = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    mainFields: ['main', 'module'],
    alias: {
      '@': path.join(__dirname, '..', 'src')
    }
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

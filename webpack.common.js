const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackPWAManifest = require('webpack-pwa-manifest');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: 'src/public/favicon.ico',
      favicons: {
        appName: 'Restaurant Hunter Lite',
        appDescription: 'Gratis informasi tentang restoran terbaik di Indoensia untukmu',
        developerName: 'labsan',
        developerURL: '',
        background: '#F8EDE3',
        theme_color: '#5D5E55',
      },
    }),
    new WebpackPWAManifest({
      name: 'Restaurant Hunter Lite',
      short_name: 'RestHunter Lite',
      description: 'Gratis informasi tentang restoran terbaik di Indoensia untukmu',
      orientation: 'any',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#F8EDE3',
      theme_color: '#5D5E55',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve('src/public/icons/icon-512x512.png'),
          sizes: [36, 48, 72, 96, 144, 192, 384, 512],
          destination: path.join('icons', 'android'),
          purpose: 'any maskable',
        },
        {
          src: path.resolve('src/public/icons/icon-512x512.png'),
          sizes: [57, 60, 72, 76, 114, 120, 152, 167, 180, 192, 512],
          destination: path.join('icons', 'apple'),
          ios: true, // make eligible to the app-touch-icon meta tag
          purpose: 'any maskable',
        },
      ],
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js'),
    }),
    new InjectManifest({
      swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
      swDest: 'sw.js',
    }),
  ],
};

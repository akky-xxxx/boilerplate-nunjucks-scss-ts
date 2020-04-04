const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getEntryFileList = require('./lib/getEntryFileList')
const AutoPrefixer = require('autoprefixer')

const srcPath = './src'
const distPath = `${__dirname}/dist`
const entries = getEntryFileList(srcPath)
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: entries,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer({
                  browsers: ['last 1 versions'],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
  output: {
    path: distPath,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  devServer: {
    contentBase: distPath,
    open: isDev,
    hot: isDev,
    port: 3000,
    compress: !isDev,
    watchContentBase: true,
  },
}

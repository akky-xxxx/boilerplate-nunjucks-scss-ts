const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getEntryFileList = require('./lib/getEntryFileList')
const AutoPrefixer = require('autoprefixer')

const srcPath = './src'
const distPath = `${__dirname}/dist`
const entries = getEntryFileList(srcPath)
console.log(entries)

module.exports = {
  mode: 'development',
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
    open: true,
    hot: true,
    port: 3000,
    watchContentBase: true,
  },
}

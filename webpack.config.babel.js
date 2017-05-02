import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

export default {
  context: path.resolve(__dirname, 'src'),

  entry: {
    polyfill: 'babel-polyfill',
    vendor: [
      'react',
      'react-dom',
      'semantic-ui-react'
    ],
    app: 'app'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].js',
    sourceMapFilename: '[file].map',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      ie: 11
                    }
                  }
                ],
                'react',
                'stage-0'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'semantic-ui-css')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(scss|sass)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'semantic-ui-css')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|eot)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules', 'semantic-ui-css')
        ],
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js']
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    historyApiFallback: true,
    port: 3000,
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfill', 'vendor'].reverse(),
      minChunks: Infinity
    }),
    new ExtractTextPlugin('style.[chunkhash].css'),
    new HtmlWebpackPlugin({
      title: 'React Boilerplate',
      template: 'index.template.ejs'
    }),
  ]
}

'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 配置webpack编译入口
  entry: { app: './src/main.js' },
  // 配置webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式，基于文件的md5生成Hash名称的script来防止缓存
    filename: '[name].js',
    // webpack编译输出的发布路径(判断是正式环境或者开发环境等)
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    //自动解析确定的拓展名,使导入模块时不带拓展名
    extensions: ['.js', '.vue', '.json'],
    // 创建import或require的别名，一些常用的，路径长的都可以用别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@img': resolve('src/asstes/images'),
      '@static': resolve('static'),
    }
  },
  module: {
    rules: [
      {
        // vue文件后缀
        test: /\.vue$/,
        //使用vue-loader处理
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "markdown-loader",
            options: {
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.jade$/,
        loader: "jade"
      },
      {
        test: /\.pug$/,
        loader: 'pug'
      },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

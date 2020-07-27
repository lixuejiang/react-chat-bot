const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 将不常更新的公共包打包到一起，避免每次 run dev / run build 的时候重复编译。
 *
 * 当公共包需要更新时，比如升级版本/添加新的公共包：
 * 1. npm run dll # 编译公共包
 * 2. npm run dll-ship # 发布公共包（cship 在 npm run 下运行有问题，请复制 dll-ship 内容手动运行）
 * 3. 更新 index.ejs 的 vendor 版本号，和项目一起发布。
 *
 * 注意：
 * 1. 如果需要更新公共包，切记公共包和项目包需要一起发布，不可二缺一！
 * 2. 开发和线上分别使用一份 vendor，每个 vendor 和 manifest 是对应的
 */

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const name = isDev ? 'vendor-[hash].dev' : 'vendor-[hash]';

  return {
    context: __dirname,
    entry: [
      'react',
      'react-dom',
      'antd',
      'antd/dist/antd.min.css',
      'dva/router',
      'dva/saga',
      'dva/fetch',
      '@babel/polyfill',
      'react-router-dom',
      'url-polyfill',
      'whatwg-fetch',
    ],
    output: {
      filename: `${name}.js`,
      path: path.resolve(__dirname, './vendor/dist/'),
      library: 'vendor',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './src/index.ejs'),
        chunksSortMode: 'none',
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DllPlugin({
        name: 'vendor',
        path: path.resolve(
          __dirname,
          isDev
            ? './vendor/vendor-manifest-dev.json'
            : './vendor/vendor-manifest.json'
          ,
        ),
      }),
      new MiniCssExtractPlugin({
        filename: `${name}.css`,
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
      ],
    },
    devtool: 'source-map',
  };
};

const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { name, version } = require('./package.json');

const matchSVGSprite = /assets\/icons\/|components\/Base\/Icon\/icons\//;

const createCssLoaders = (isLess, isDev) => {
  const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
  if (isLess) {
    return [
      styleLoader,
      {
        loader: 'css-loader',
        options: {
          // 2.0+ 写法
          // modules: true,
          // // localIdentName: '[name]_[local]-[hash:base64:6]',
          // localIdentName: '[path][name]__[local]--[hash:base64:5]',
          // 3.0+ 写法
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
      {
        loader: 'style-resources-loader',
        options: {
          // less 全局变量
          patterns: path.resolve(__dirname, './src/assets/less/variables/theme.less'),
          injector: 'append',
        },
      },
    ];
  } else {
    return [
      styleLoader,
      'css-loader',
    ];
  }
};

const manifest = require('./vendor/vendor-manifest.json');
const manifestDev = require('./vendor/vendor-manifest-dev.json');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const { ESLINT_LOADER_DISABLED, IS_REAL_PROD } = process.env; // 通过环境变量禁用 eslint-loader

  const publicPath = isDev
    ? '/'
    : IS_REAL_PROD
      ? `//s.newscdn.cn/${name}/${version}/`
      : `//t.newscdn.cn/${name}/${version}/`;

  console.log('publicPath: ', publicPath);

  return {
    entry: {
      index: [path.resolve(__dirname, './src/index.ts')],
    },

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
      publicPath,
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-react',
                  ['@babel/preset-env', {
                    modules: false,
                  }],
                ],
                plugins: [
                  '@babel/plugin-syntax-dynamic-import',
                  ['@babel/plugin-proposal-decorators', { legacy: true }],
                  '@babel/plugin-proposal-class-properties',
                  ['@babel/plugin-transform-runtime', {
                    useESModules: true,
                  }],
                  // ['import', {
                  //   libraryName: 'antd',
                  //   libraryDirectory: 'es',
                  //   style: 'css',
                  // }, 'antd'],
                  // ['import', {
                  //   libraryName: 'lodash',
                  //   libraryDirectory: '',
                  //   camel2DashComponentName: false,
                  // }, 'lodash'],
                  // 'dva-hmr', // TODO
                ],
                cacheDirectory: true,
                cacheCompression: false,
              },
            },
            ...(isDev && !ESLINT_LOADER_DISABLED ? ['eslint-loader'] : []),
          ],
          exclude: [/node_modules/],
        },
        {
          test: /\.tsx?/,
          use: [
            'cache-loader',
            {
              loader: 'thread-loader',
              options: {
                // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                worker: os.cpus().length - 1,
                poolTimeout: Infinity,
              },
            },
            {
              loader: 'ts-loader',
              options: {
                happyPackMode: true,
                transpileOnly: true,
                compilerOptions: {
                  noEmit: false,
                  module: 'esnext',
                  target: isDev ? 'es2017' : 'es5',
                },
              },
            },
          ],
        },
        {
          test: /\.(mp4|png|jpg|jpeg|png|svg|cur|gif|webp|webm|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'static/[name].[hash].[ext]',
              },
            },
          ],
          exclude: matchSVGSprite,
        },
        {
          test: /\.svg$/,
          include: matchSVGSprite,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]',
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: createCssLoaders(true, isDev),
        },
        {
          test: /\.css$/,
          use: createCssLoaders(false, isDev),
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|less)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    plugins: [
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        async: false,
      }),
      new CaseSensitivePathsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, './src/index.ejs'),
        chunksSortMode: 'none',
      }),
      new SpriteLoaderPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      ...(isDev ? [] : [
        new MiniCssExtractPlugin({
          // filename: '[name].css',
          // chunkFilename: '[id].css',
        }),
        new OptimizeCSSAssetsPlugin(),
      ]),
      new webpack.DllReferencePlugin({
        manifest: isDev ? manifestDev : manifest,
      }),
      // new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || argv.mode),
      }),
    ],

    externals: {
    },

    resolve: {
      symlinks: false,
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    devServer: {
      port: 8009,
      disableHostCheck: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://test.ai.xinwen.cn',
          changeOrigin: true,
        },
        '/user': {
          target: 'http://test.ai.xinwen.cn',
          changeOrigin: true,
        },
        '/uic': {
          target: 'http://test.ai.xinwen.cn',
          changeOrigin: true,
        },
        '/magic': {
          target: 'http://test.ai.xinwen.cn',
          changeOrigin: true,
        },
        '/search': {
          target: 'http://test.ai.xinwen.cn',
          changeOrigin: true,
        },
      },
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: true,
        publicPath: false,
        warningsFilter: /export .* was not found in/,
      },
    },

    // 开发环境 eval 的速度最快，调试比较准确（实际运行的代码和 devtool 看到的一致，不容易出现断点打不上的问题）
    // 生产环境 sourcemap 只包含文件名和行信息
    devtool: isDev
      ? 'eval'
      : IS_REAL_PROD
        ? 'hidden-source-map'
        : 'source-map',

    stats: {
      children: false,
      warningsFilter: warning => /Conflicting order between/gm.test(warning),
    },
  };
};

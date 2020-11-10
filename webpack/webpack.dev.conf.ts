import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import ip from 'ip';

const env = process.env.NODE_ENV || 'development';
let mode = 'development';

let cssLoader = MiniCssExtractPlugin.loader;
if (env === 'development') {
  mode = 'development';
  cssLoader = 'style-loader';
}

const config = {
  mode,
  entry: {
    index: ['react-hot-loader/patch', './client/index.tsx'],
  },
  output: {
    // publicPath: "/dist/",
    // filename: "[name].[hash].js",
    path: path.resolve(__dirname, '..', 'static'),
    filename: '[name].js',

    // // 输出的路径，用了Node语法
    // path:path.resolve(__dirname,'dist'),
    // //输出的文件名称
    // filename:'bundle.js'

    // filename: '[name].[hash].js',
    // path: path.resolve(__dirname,'..', 'dist'),
    // publicPath: 'http://localhost:8000/'
    publicPath: `http://${ip.address()}:8000/`
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    // host: 'http://localhost:8080',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '..' ,'static'),
    port: 8000,
    // publicPath: 'http://localhost:8000/'
    // open: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  module: {
    // 加载器配置
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: cssLoader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: () => [
                require('postcss-import')(),
                require('postcss-nested')(),
              ],
            },
          },
          require.resolve('sass-loader'),
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.([jt])sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.ts|.tsx$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.client.json',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // template: './client/index.html',
      // template: path.resolve(__dirname, '..', 'client', 'index.html'),
      template: path.join(__dirname,'../client/index.html'),
      filename: 'index.html',
      /**
       * 注入选项。有四个选项值 true, body, head, false.
      true：默认值，script标签位于html文件的 body 底部
      body：script标签位于html文件的 body 底部（同 true）
      head：script 标签位于 head 标签内
      false：不插入生成的 js 文件，只是单纯的生成一个 html 文件
       */
      inject: true,
      // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值
      hash: true,
      minify: {// 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件
      chunks: ['index', 'vendor', 'manifest'],
      // 设置图标
      favicon: path.resolve(__dirname, '..', 'client', 'assets', 'image', 'daomei.png'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@rootDir': path.resolve(__dirname, '../'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 共有3个值"initial"，"async"和"all"。配置后，代码分割优化仅选择初始块，按需块或所有块
      minSize: 30000, // （默认值：30000）块的最小大小
      minChunks: 2, // （默认值：1）在拆分之前共享模块的最小块数
      maxAsyncRequests: 5, //（默认为5）按需加载时并行请求的最大数量
      maxInitialRequests: 3, //（默认值为3）入口点的最大并行请求数
      automaticNameDelimiter: '.', // 默认情况下，webpack将使用块的来源和名称生成名称，例如vendors~main.js
    },
  },
};
export default config;

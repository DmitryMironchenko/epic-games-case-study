const path = require('path')

const marked = require('marked')
const renderer = new marked.Renderer()

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/front/src/index.js'],
  output: {
    /* eslint-disable-next-line */
    path: __dirname,
    filename: './src/front/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.md$/,
        use: [{ loader: 'html-loader' }, { loader: 'markdown-loader', options: { renderer } }]
      }
    ]
  },
  resolve: {
    /* eslint-disable-next-line */
    modules: [path.resolve(__dirname, 'src/front/src'), 'node_modules']
  },
  target: 'web'
}

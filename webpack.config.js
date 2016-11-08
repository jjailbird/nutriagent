const path = require('path');
// let webpack = require('webpack');
const pathDist = path.join(__dirname, './dist');

module.exports = [{
  name: 'chartComponent',
  entry: {
    line: './line.jsx',
  },
  output: {
    path: pathDist,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: [/\.jsx$/],
        loaders: ['jsx-loader?insertPragma=React.DOM&harmony'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },
}];

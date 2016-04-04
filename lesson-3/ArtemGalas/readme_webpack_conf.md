1. npm install
2. tsd install
3 Create webpack.config.js and paste below text
module.exports = {
  entry: "./scripts/main.js",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extension: ['', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
};
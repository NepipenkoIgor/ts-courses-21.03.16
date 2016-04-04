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
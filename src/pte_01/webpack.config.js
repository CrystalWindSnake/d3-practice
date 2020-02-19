var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/ts/main.ts",
  output: {
    filename: "main.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/css',
      to: 'css'
    },
    {
      from: './src/index.html',
      to: 'index.html'
    }
    ])]
};
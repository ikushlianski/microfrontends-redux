const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const {dependencies: deps} = require('./package.json');

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001,
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"]
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      library: { type: "var", name: "app1" },
      filename: "remoteEntry.js",
      exposes: {
        // expose each component
        "./App": "./src/App",
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true,
        },
        redux: {
          requiredVersion: deps.redux,
          singleton: true,
        },
        ["react-redux"]: {
          requiredVersion: deps["react-redux"],
          singleton: true,
        },
        ["@apollo/client"]: {
          requiredVersion: deps["@apollo/client"],
          singleton: true,
        },
        ["graphql"]: {
          requiredVersion: deps["graphql"],
          singleton: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

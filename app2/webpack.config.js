const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");
const deps = require('./package.json').dependencies;

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3002,
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: {type: "var", name: "app2"},
      remotes: {
        app1: "app1",
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

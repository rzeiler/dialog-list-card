// webpack.config.js
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// import path from "path";

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "dialog-list-card.js",
    path: path.resolve(__dirname, "."),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "."),
    },
    host: "0.0.0.0",
    hot: true,
    liveReload: true,
    allowedHosts: "all", 
    port: 5173,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    client: {
      webSocketURL: {
        hostname: "localhost", // oder deine IP-Adresse
        port: 5173,
        protocol: "ws",
      },
    },
  },
};

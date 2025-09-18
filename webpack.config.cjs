// webpack.config.js
const path = require("path");

// import path from "path";

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "dialog-list-card.js",
    path: path.resolve(__dirname, "."),
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

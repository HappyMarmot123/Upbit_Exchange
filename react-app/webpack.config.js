const path = require("path");

module.exports = {
  //...
  devServer: {
    port: 4000,
    liveReload: true,
    // host 지정
    host: "0.0.0.0",
    allowedHosts: "all",
    open: true,
    client: {
      overlay: true,
      // 웹소켓용 url 지정
      webSocketURL: "ws://0.0.0.0:80/ws",
    },
    compress: true,
  },
};

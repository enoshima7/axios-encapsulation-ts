const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.apishop.net/common/",
      changeOrigin: true,
      pathRewrite: (path) => path.replace(/^\/api/, ""),
    })
  );
};

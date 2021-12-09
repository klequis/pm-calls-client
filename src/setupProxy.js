// const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = (app) => {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: process.env.REACT_APP_API_HOST || "http://localhost:8000",
//       changeOrigin: true,
//     })
//   );
// };

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  )
}

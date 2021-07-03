const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use('/test',createProxyMiddleware({
        target:'https://www.zhihu.com',
        changeOrigin:true,
        pathRewrite(path) {
            return path.replace('/test', '');
        }
    }))
}

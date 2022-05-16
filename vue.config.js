module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    public: 'localhost:8080',
    proxy: {
      '^/api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        logLevel: 'debug',
        // pathRewrite: { '^/api': '/' },
      }
    }
  }
}
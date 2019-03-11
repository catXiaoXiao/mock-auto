const proxy = {
  proxy: {
    '/api': {
      target: 'http://127.0.0.0:10087/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
}
module.exports = {
  env: {
    NODE_ENV: '"development"',
    TEST_ENV: process.env.TEST_ENV,
  },
  h5: {
    devServer: {
      host: '127.0.0.0',
      port: 10086,
      ...proxy,
    },
  },
}

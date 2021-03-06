var path = require('path')
var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('../config/dev').h5.devServer
var loadModule = require('./load-module')
var mockServer =  function () {
  var router = express.Router()
  var app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(cookieParser())

  router.all('*', function (req, res, next) {
    var urlInfo = req._parsedUrl
    var pathName = urlInfo.pathname
    var lastIndex = pathName.lastIndexOf('/') + 1
    var dirPath = pathName.substring(0, lastIndex).replace(/\/.*api/, '')
    var moduleName = pathName.substring(lastIndex).replace('&', '')
    var modules = loadModule(path.join(__dirname, '../mock' + dirPath))
    var module = modules[moduleName]
    res.header("Content-Type", "application/json; charset=utf-8");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.cookie('TestCookie', 1, {maxAge: 30 * 60 * 1000})
    if (module && typeof module === 'function') {
      res.end(JSON.stringify(module(req, res, next)))
    } else {
      res.end('{"status":"error","code":"-1","msg":"模块' + moduleName + '不存在,","data":""}')
    }
  })

  app.use('/', router)
  app.listen(10087, function () {
    console.log('\n本地mock开发环境即将启动，请访问：http://localhost' + ':' + 10087)
    if(config.httpsEnable){
      console.log('您已开启https支持，请访问：https://localhost' + ':' + 10087)
    }
  })
}

module.exports = () => {
  if (process.env.TEST_ENV) {
    mockServer()
  }
}
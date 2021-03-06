/**
 * @author liuxiao
 * @date 2019/1/31
 */
require('./mock-server')()
var fs = require('fs')
var Path = require('path')
var readLine = require('readline')
var mkdirp = require('mkdirp')
var apiTemplate = require('./mockTemplate/template.js')

var server = {
  start() {
    var apiPath = Path.join(__dirname, '../service/index.js')
    fs.watchFile(apiPath, {
      persistent: true,
      interval: 2
    }, () => {
      var rd = readLine.createInterface({
        input: fs.createReadStream(apiPath),
        terminal: false
      });
      rd.on('line', function (line) {
        var matches = line.match(/request\(\{(?:\s*)url:(?:\s*)(?:'|")\/(?:(.*)\/)?(.*?)(?:'|")/)
        if (!matches || !matches[2]) return;
        var path = Path.join(__dirname, '../mock', matches[1] || '')
        var name = matches[2] + '.js'
        var apiFile = path + Path.sep + name;
        if (checkExits(path)) {
          if (!checkExits(apiFile)) {
            mkfile(apiFile)
          }
        } else {
          mkdirp(path, function (err) {
            if (!err) {
              mkfile(apiFile)
            }
          })
        }
      })
    });


    function mkfile(path) {
      fs.open(path, 'w+', function (err, fd) {
        if (err) {
          return;
        }
        fs.write(fd, apiTemplate.tpl,
          function (err) {
            if (err) throw err;
            fs.closeSync(fd);
          })
      })
    }

    function checkExits(file) {
      var stat = null;
      try {
        stat = fs.statSync(file);
      } catch (e) {
        return false;
      }
      return stat.isFile() || stat.isDirectory();
    }
  }
}


module.exports = server

var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

var server_root = "localhost:8090"

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_URL: JSON.stringify("http://" + server_root),
  API_ROOT: JSON.stringify("http://" + server_root + "/api"),
  WS_ROOT: JSON.stringify("ws://" + server_root + "/wsapi")
})

var server_root = "finger-lord.ratina.org"

module.exports = {
  NODE_ENV: '"production"',
  ROOT_URL: JSON.stringify("http://" + server_root),
  API_ROOT: JSON.stringify("http://" + server_root + "/api"),
  WS_ROOT: JSON.stringify("ws://" + server_root + "/wsapi")
}

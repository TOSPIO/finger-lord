import $ from 'jquery'

class WSDataExchangeException {
  constructor (message) {
    this.message = message
  }
}

class WSDataExchange {
  constructor (ws) {
    this._ws = ws
    this._ws.onmessage = evt => {
      if (this._ws.readyState >= 2) { // CLOSING or CLOSED
        throw new WSDataExchangeException('Attempting to listen on a closed WebSocket object')
      }
      let payload = JSON.parse(evt.data)
      let close = false
      try {
        switch (payload.msgtype) {
          case 'DONE':
            if (this._success) {
              this._success(payload.data)
            }
            close = true
            break
          case 'ERROR':
            if (this._error) {
              this._error(payload.data)
            }
            close = true
            break
          case 'DATA':
            if (this._onmessage) {
              this._onmessage(payload.data)
            }
            break
          default:
            close = true
            throw new WSDataExchangeException('Unsupported msgtype: ' + payload.msgtype)
        }
        if (close) {
          if (this._complete) {
            this._complete(payload.data)
          }
        }
      } finally {
        if (close) {
          this._ws.close()
        }
      }
      return this
    }
  }

  onmessage (func) {
    this._onmessage = func
    return this
  }

  success (func) {
    this._success = func
    return this
  }

  error (func) {
    this._error = func
    return this
  }
  complete (func) {
    this._complete = func
    return this
  }
}

export const VueExt = {
  install: function (Vue, options) {
    Vue.prototype.http_get = function (res) {
      return this.$http.get(process.env.API_ROOT + '/' + res)
    }

    Vue.prototype.http_post = function (res, data) {
      return this.$http.post(process.env.API_ROOT + '/' + res, data)
    }

    Vue.prototype.send = function (res, topic, data) {
      let ws = new WebSocket(process.env.WS_ROOT + '/' + res)
      let payload = {
        topic: topic,
        data: data
      }
      ws.onopen = () => ws.send(JSON.stringify(payload))
      return new WSDataExchange(ws)
    }
  }
}

export const Alert = new function () {
  let popup = function (level, msg) {
    let box = $(`<div class="alert alert-${level} alert-dismissable"></div>`)
    let msgWrapper = $('<span></span>')
    let button = $('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>')
    box.append(msgWrapper)
    box.append(button)
    msgWrapper.text(msg)
    $('body').append(box)
    box.css('position', 'fixed')
    box.css('left', 0)
    box.css('right', 0)
    box.css('bottom', 0)
    box.css('margin-left', 'auto')
    box.css('margin-right', 'auto')
    box.css('width', '50%')
  }

  this.alert = popup.bind(this, ['danger'])
  this.warning = popup.bind(this, ['warning'])
  this.info = popup.bind(this, ['info'])
  this.success = popup.bind(this, ['success'])
}()

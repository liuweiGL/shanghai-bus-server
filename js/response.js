const Types = require('./types')

class Response {
  constructor() {
    this.status = -1 // 未定义
    this.data = null
  }
  static create() {
    return new Response()
  }
  done(res, data) {
    this.data = data
    this.status = Types.Status.SUCCESS
    res.send(this)
  }
  fail(res, data) {
    this.data = data
    this.status = Types.Status.FAIL
    res.send(this)
  }
}

module.exports = Response

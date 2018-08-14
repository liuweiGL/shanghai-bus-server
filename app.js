const express = require('express')
const path = require('path')
const log4js = require('log4js')
const bodyParser = require('body-parser')

const index = require('./routes/index')

const app = express()

// 设置log
log4js.configure('./log4js.config.json')

const logger = log4js.getLogger()

// 使用 log
app.use(log4js.connectLogger(logger))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 静态文件
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

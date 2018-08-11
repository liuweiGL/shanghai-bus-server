const express = require('express')
const router = express.Router()
const bus = require('../controllers/bus')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

router.get('/bus', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

// bus api
router.get('/bus/list', bus.queryBusByLocation)
router.get('/bus/detail', bus.queryBusDetailByRouter)
router.get('/bus/stop', bus.queryStopInfo)

module.exports = router
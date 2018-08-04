const express = require('express')
const router = express.Router()
const bus = require('../controllers/bus')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  })
})

// bus api
router.get('/bus/list', bus.queryBusByLocation)
router.get('/bus/detail', bus.queryBusDetailByRouter)
router.get('/bus/id', bus.queryBusIdByRouter)
router.get('/bus/stop', bus.queryStopInfo)

router.post('/bus/test', function (req, res) {
  res.send({
    params: req.params,
    query: req.query,
    data: req.body
  })
})
module.exports = router
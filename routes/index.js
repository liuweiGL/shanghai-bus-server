const express = require('express')
const router = express.Router()
const bus = require('../controllers/bus')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// bus api
router.get('/bus/list/:location',bus.queryBusByLocation)
router.get('/bus/detail/:router',bus.queryBusByRouter)
router.get('/bus/:router/id',bus.queryBusByRouter)
router.get('/bus/:router/stop/:station',bus.queryStopInfo)

module.exports = router;
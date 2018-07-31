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
router.get('/bus/:line',bus.queryLine)
router.get('/bus/:station',bus.queryStation)
router.get('/bus/:line/stop/:station',bus.queryStop)

module.exports = router;
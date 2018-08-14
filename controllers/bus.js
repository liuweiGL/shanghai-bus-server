const crypto = require('crypto')
const busApi = require('../apis/bus')
const Response = require('../js/response')

/**
 * 判断高德地图API是否成功
 * @param {Any} result
 */
function isSuccessForAmap(data) {
  return data.status === '1'
}

// 查询附近公交
exports.queryBusByLocation = function(req, res) {
    const response = Response.create()
    busApi
      .queryBusByLocation(req.query.location)
      .then((data) => {
        if (isSuccessForAmap(data)) {
          const routerNames = data.pois.reduce((pre, next) => {
            return pre.concat(next.address.split(';'))
          }, [])
          response.done(res, [...new Set(routerNames)])
        } else {
          response.fail(res, data)
        }
      })
      .catch((error) => {
        response.fail(res, error)
      })
}

// 查询公交路线详情
exports.queryBusDetailByRouter = function(req, res) {
  const router = req.query.router
  const response = Response.create()
  busApi
    .queryBusDetailByRouter(router)
    .then((data) => {
      if (isSuccessForAmap(data)) {
        const hash = crypto.createHash('md5')
        const sid = hash.update(router).digest('hex')
        const {
          buslines: [busline]
        } = data
        if (busline) {
          response.done(res, {
            sid,
            name: busline.name,
            company: busline.company,
            price: busline.basic_price,
            startTime: Array.isArray(busline.start_time)
              ? busline.start_time[0]
              : busline.start_time,
            endTime: Array.isArray(busline.end_time)
              ? busline.end_time[0]
              : busline.end_time,
            interval: busline.interval,
            frontName: busline.front_name,
            terminalName: busline.terminal_name,
            stations: busline.busstops.map((station) => station.name)
          })
        } else {
          response.done(res, null)
        }
      } else {
        response.fail(res, data)
      }
    })
    .catch((error) => {
      response.fail(res, error)
    })
}

// 公交到站信息
exports.queryStopInfo = function(req, res) {
  const response = Response.create()
  busApi
    .queryStopInfo(req.query)
    .then((data) => {
      if (Array.isArray(data)) {
        response.done(
          res,
          data.map((item) => {
            const {
              '@attributes': { cod },
              terminal,
              stopdis,
              distance,
              time
            } = item
            return {
              time,
              distance,
              routerName: cod,
              stationSum: stopdis,
              plateNumber: terminal
            }
          })
        )
      } else if (data.error === '-2') {
        response.done(res, null)
      } else {
        response.fail(res, data)
      }
    })
    .catch((error) => {
      response.fail(res, error)
    })
}

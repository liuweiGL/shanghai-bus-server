const busApi = require('../apis/bus')
const Status = require('../js/types').Status

/**
 * 判断高德地图API是否成功
 * @param {Any} result
 */
function isSuccessForAmap(result) {
  return result.status === Status.SUCCESS && result.data.status === '1'
}
// 查询附近公交
exports.queryBusByLocation = async function(request, response) {
  const result = await busApi.queryBusByLocation(request.query.location)
  if (isSuccessForAmap(result)) {
    const { status, data } = result
    const routers = data.pois.reduce((pre, next) => {
      return pre.concat(next.address.split(';'))
    }, [])
    response.send({
      status,
      data: {
        routers: [...new Set(routers)]
      }
    })
  } else {
    response.send({
      data,
      status: Status.FAIL
    })
  }
}

// 查询公交路线详情
exports.queryBusByRouter = async function(request, response) {
  const result = await busApi.queryBusByRouter(request.query.router)
  if (isSuccessForAmap(result)) {
    const { status, data } = result
    // const buslines = data.data.busline_list.map((busline) => {
    //   return {
    //     name: busline.name,
    //     company: busline.company,
    //     price: busline.basic_price,
    //     startTime: busline.start_time,
    //     endTime: busline.end_time,
    //     interval: busline.interval,
    //     frontName: busline.front_name,
    //     terminalName: busline.terminal_name,
    //     stations: busline.stations.map((station) => {
    //       return {
    //         name: station.name,
    //         startTime: station.start_time,
    //         endTime: station.end_time
    //       }
    //     })
    //   }
    // })
    response.send({
      status,
      data: {
        buslines:data
      }
    })
  } else {
    response.send({
      data,
      status: Status.FAIL
    })
  }
}

// 查询公交ID
exports.queryBusIdByRouter = async function(request, response) {
  const result = await busApi.queryBusIdByRouter(request.query.router)
  response.send(result)
}

// 公交到站信息
exports.queryStopInfo = async function(request, response) {
  const result = await busApi.queryStopInfo(request.query)
  response.send(result)
}

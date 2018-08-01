const busApi = require('../apis/bus')

// 查询附近公交
exports.queryBusByLocation = async function (request, response) {
  const result = await busApi.queryBusByLocation(request.params.location)
  console.log(result)
}

// 查询公交路线详情
exports.queryBusByRouter = async function (request, response) {
  const result = await busApi.queryBusByRouter(request.params.router)
  response.send(result.data)
}

// 查询公交ID
exports.queryBusIdByRouter = async function (request, response) {
  const result = await busApi.queryBusIdByRouter(request.params.router)
  console.log(result)
}

// 公交到站信息
exports.queryStopInfo = async function (request, response) {
  const result = await busApi.queryStopInfo(request.params)
  console.log(result)
}
const querystring = require('querystring')
const request = require('../js/request')

const AMAP_KEY = '78cdb87ae7330aa8949a2c2c9868e834'

/**
 * 查询附近的公交
 * @param {String} location 经纬度
 *
 * see https://lbs.amap.com/api/webservice/guide/api/search
 */
exports.queryBusByLocation = function(location) {
  return request({
    url: 'https://restapi.amap.com/v3/place/around',
    method: 'GET',
    params: {
      location,
      key: AMAP_KEY,
      offset: 20,
      radius: 500,
      city: '310000',
      types: '交通设施服务|150700'
    }
  })
}

/**
 * 根据路线查询公交
 * @param {String} router 公交路线
 */
exports.queryBusDetailByRouter = function(router) {
  return request({
    url: 'https://www.amap.com/service/poiInfo',
    method: 'GET',
    params: {
      keywords: router,
      qii: true,
      city: '310000',
      pagesize: 20,
      need_utd: true,
      cluster_state: 5,
      is_classify: true,
      utd_sceneid: 1000,
      query_type: 'TQUERY',
      addr_poi_merge: true
    }
  })
}

/**
 * 查询公交到站信息
 * @param {Object} data
 * {
 *   stoptype: 公交行驶方向
 *   stopid: 站台ID,
 *   sid: 公交ID
 * }
 */
exports.queryStopInfo = function(data) {
  const { direction, stationIndex, sid } = data
  return request({
    url: 'http://shanghaicity.openservice.kankanews.com/public/bus/Getstop',
    method: 'POST',
    // data: `sid=${sid}&stoptype=${direction}&stoptype=${stationIndex}`
    data: querystring.stringify({
      sid: data.sid,
      stopid: data.stationIndex,
      stoptype: data.direction
    })
  })
}

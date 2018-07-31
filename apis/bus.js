const axios = require('axios')

const AMAP_KEY = '78cdb87ae7330aa8949a2c2c9868e834'

/**
 * 查询附近的公交
 * @param {String} location 经纬度
 * 
 * see https://lbs.amap.com/api/webservice/guide/api/search
 */
exports.queryBusByLocation = function(location){
  return axios({
    url: 'https://restapi.amap.com/v3/place/around',
    method: 'GET',
    params: {
      location,
      key: AMAP_KEY,
      offset: 20,
      radius: 500,
      city: '上海',
      types: '交通设施服务|150700', 
    }
  })
}

/**
 * 根据路线查询公交
 * @param {String} router 公交路线
 */
exports.queryBusByRouter = function (router) {
  return axios({
    url: 'https://www.amap.com/service/poiInfo',
    method: 'GET',
    params: {
      keywords: router,
      pagenum: 1,
      city: '上海',
      pagesize: 20,
      utd_sceneid: 1000,
      query_type: 'TQUERY'
    }
  })
}

/**
 * 根据路线获取公交ID
 * @param {String} router 公交路线
 */
exports.queryBusIdByRouter = function (router){
  return axios({
    url: 'http://shanghaicity.openservice.kankanews.com/public/bus/get',
    method: 'POST',
    data: {
      idnum: router
    }
  })
}

/**
 * 查询公交到站信息
 * @param {Object} data
 * {
 *   stopid: 站台ID,
 *   sid: 公交ID
 * } 
 */
exports.queryBusByStation = function (data){
  return axios({
    url: 'http://shanghaicity.openservice.kankanews.com/public/bus/Getstop',
    method:'POST',
    data: {
      stoptype: 0,
      ...data
    }
  })
}


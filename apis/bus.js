const axios = require('axios')

const AMAP_KEY = '78cdb87ae7330aa8949a2c2c9868e834'

/**
 * 根据路线查询公交
 * @param {String} line 公交路线
 */
exports.queryBusByLine = function (line) {
  return axios({
    url: 'https://restapi.amap.com/v3/bus/linename',
    method: 'GET',
    params: {
      city: '上海',
      key: AMAP_KEY,
      keywords: line
    }
  })
}

/**
 * 根据站台查询公交
 * @param {String} station 站台
 */
exports.queryBusByStation = function(station){
  return axios({
    url: 'https://restapi.amap.com/v3/bus/stopname',
    method: 'GET',
    params: {
      city: '上海',
      key: AMAP_KEY,
      keywords: station
    }
  })
}


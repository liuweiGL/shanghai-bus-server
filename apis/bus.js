const querystring = require('querystring')
const request = require('../js/request')
const https = require('https')

const city = '上海'
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
      city,
      location,
      key: AMAP_KEY,
      offset: 20,
      radius: 500,
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
    url: 'https://restapi.amap.com/v3/bus/linename',
    method: 'GET',
    params: {
      city,
      key: AMAP_KEY,
      keywords: router,
      offset: 1,
      extensions: 'all'
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

  const body = querystring.stringify({
    sid,
    stopid: stationIndex,
    stoptype: direction
  })

  const options = {
    hostname: 'shanghaicity.openservice.kankanews.com',
    port: 443,
    path: '/public/bus/Getstop',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      cookie:
        'aliyungf_tc=AQAAAOIWmxJ6lwgAVJlXZfuSTgEEckBh; acw_tc=2f624a5b15517658295641353e42f25aee7cbc2c57e0d5b8a7c2f8f2fc6b48; souid=wKgBHFx+ETmOYl5cJ1AWAg==; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFx+EUWZ+AdDBjvoAg==; _ga=GA1.2.1002298288.1551765831; last_search_records=eyJpdiI6IkNySG1md2F6YzBlU0pQVWF0REptMlE9PSIsInZhbHVlIjoiYnFuNFk4ZlV3ek9IT3ZaSUpudDdCU2o4UTZxR0RXQStET3NqYkt0b3hlYz0iLCJtYWMiOiI2MmY1YjNiNGZlYThjOWVhMjA0YmNmZDg3MmJjOTEyZWJlNDdkYzI3MDAwODAzMmZiMTNmOWMwMTY0MzU2YmE1In0%3D; _gat=1; XSRF-TOKEN=eyJpdiI6IlZRb21iN3BTU2dqNFFha05hWmQwVVE9PSIsInZhbHVlIjoibjNPK25PK0tENHI5eDB0OXRMQk8rYnRiNDVyN2hmZHMyekJUY3hEYTVtVmxvNERqS0RmaDllVEtLQ3ZcL3JiRXhlZDl0ckw0YVlORTJVSmo5T3QzTld3PT0iLCJtYWMiOiIzNmFhY2YyY2YyNjdmZjNhYWM3YWM2MzYzMzRmZThiNDI5MDEzMmUzZWM5NzBhZTg0ZTk4MDZiMDEzMmU3M2Q0In0%3D; _session=eyJpdiI6IkpzVjkwWEM1SFwvdytiSjB6UW9MOU5nPT0iLCJ2YWx1ZSI6ImpkbEN3cHI2MGZRNkhlT2I4Vll2TDFBQ2hBSFhVNmhNQkczeE1sK2lqYU5XYjFBQzdJQ0xVbm5TNlJTMDZnc3NBYzkrZ3pWajNTdUljZ0k3VXBCM2ZnPT0iLCJtYWMiOiJjZjU5YTYzNDUzOGU4MGY4ZGZkYzViYTdiNDUxZjZhNTMwNTE5MmZjNWVhNGZjMzg4MjYwMTg5YzA4YWFiMzJjIn0%3D; SERVERID=4f5f69a3e569b9cd359e6a82e64e12fb|1551767173|1551766674'
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        resolve(JSON.parse(d))
      })
    })
    req.write(body)
    req.on('error', (e) => {
      reject(e)
    })
    req.end()
  })
}

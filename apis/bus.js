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
    protocol: 'https:',
    hostname: 'shanghaicity.openservice.kankanews.com',
    port: 443,
    path: '/public/bus/Getstop',
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Host: 'shanghaicity.openservice.kankanews.com',
      Origin: 'https://shanghaicity.openservice.kankanews.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
      cookie: ''
      // 'aliyungf_tc=AQAAABOGjUhChwwAViLrdIJ9BW89dsOF; acw_tc=2f624a4415604060168226336e2e9540f7fe8ffeaee65947a1cbe2774601ea; souid=wKgBEV0B5/WqtFz3L6uBAg==; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNF0B6ACa6AdFO5FjAg==; _ga=GA1.2.709638950.1560406015; _gat=1; last_search_records=eyJpdiI6ImxtUWV6RlwvTXBZckdRVUttTXcwb2VRPT0iLCJ2YWx1ZSI6IkdpV1RkNTFEZENZdVA3Z051NkxDQWZ5dERvQU5UcG44Mk9VN2xoemxtRjg9IiwibWFjIjoiMjY0YTcxN2YxYzczNTRiZmUwMmZjZjVjNGU5OTZhMDcwMjI2NTM3MzZiMjM4YzFlMTI5NDNkYjc4NmRiMzcxNCJ9; XSRF-TOKEN=eyJpdiI6InlNajJLd1dhMjVvd3EyZXpMZElnbkE9PSIsInZhbHVlIjoiY1RNZllZSlcyXC9HeEVwUHR4bXcyS0Vvemo3NVc2azM0ZlhpQW1KY054MHlIUWRiVWw4QzhHRjVkT2pidUI2RHRsbTNES3NJMldFWXNSbHlcLzZ0Q1RoQT09IiwibWFjIjoiNmYwZTc4YmI2MWMzMjcwNzkyZDUyOTM4NzY0ZTk3NDFhOGRjNDYwMzFmNDJjNzM1OWNlZDA0NTcxYTk1ZjY5ZiJ9; _session=eyJpdiI6Ik9ITVJOWkhDdnZFeFE4NDNnWStldGc9PSIsInZhbHVlIjoidUwxamFZRG5VbndTeEpoM2ZlOHNxejBpT2dHYW9xR1JLUnVtb2xWOVA3NmtiRGRHMFdHem04ZElaaFwvWHI1QlVLQUdOdTZLQWYzTkpLT2FCcmsraVFRPT0iLCJtYWMiOiJhMDE2NGVkNTcxNjY2YzM5ZGFmNjAwODM1YjE2MjM2OWZjYWMwZGM5MGU4ZTQ2MmJlZTZjMWZmZWY5ZDU2ZDM3In0%3D; SERVERID=4f5f69a3e569b9cd359e6a82e64e12fb|1560406054|1560406016'
    }
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const chunks = []
      // 设置编码，返回字符串；否则，返回 Buffer
      res.setEncoding('utf8')
      res.on('data', (d) => {
        chunks.push(d)
      })
      res.on('end', () => {
        const result = chunks.join('')
        try {
          resolve(JSON.parse(result))
        } catch (e) {
          reject(result)
        }
      })
    })
    req.write(body)
    req.on('error', (e) => {
      reject(e)
    })
    req.end()
  })
}

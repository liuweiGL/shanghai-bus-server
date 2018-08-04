const axios = require('axios')
const Status = require('./types').Status

const request = axios.create({
  baseURL: '/',
  timeout: 1000 * 60 * 3
})
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    // 通过response返给调用者
    return Promise.resolve(error)
  }
)
request.interceptors.response.use(
  function (response) {
    return {
      status: Status.SUCCESS,
      data: response.data
    }
  },
  function (error) {
    // 通过response返给调用者
    let res
    const {
      response
    } = error

    if (response) {
      const {
        config,
        data,
        headers,
        status
      } = response
      res = {
        config,
        data,
        headers,
        status
      }
    } else {
      res = error.message
    }
    return Promise.resolve({
      status: Status.FAIL,
      data: res
    })
  }
)

module.exports = request
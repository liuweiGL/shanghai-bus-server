const axios = require('axios')

const request = axios.create({
  baseURL: '/',
  timeout: 1000 * 60 * 3
})
request.interceptors.request.use(function(config) {
  return config
})
request.interceptors.response.use(function(response) {
  return response.data
})

module.exports = request

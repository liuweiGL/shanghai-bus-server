const https = require('https')
const querystring = require('querystring')

const data = querystring.stringify({
  sid: '6.',
  stopid: '8f2af8244d4f90a1db31cd292b36191e',
  stoptype: 0
})

const options = {
  hostname: 'shanghaicity.openservice.kankanews.com',
  port: 443,
  path: '/public/bus/Getstop',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(data),
    'cookie': 'aliyungf_tc=AQAAAOIWmxJ6lwgAVJlXZfuSTgEEckBh; acw_tc=2f624a5b15517658295641353e42f25aee7cbc2c57e0d5b8a7c2f8f2fc6b48; souid=wKgBHFx+ETmOYl5cJ1AWAg==; Hm_p1vt_6f69830ae7173059e935b61372431b35=eSgsNFx+EUWZ+AdDBjvoAg==; _ga=GA1.2.1002298288.1551765831; last_search_records=eyJpdiI6IkNySG1md2F6YzBlU0pQVWF0REptMlE9PSIsInZhbHVlIjoiYnFuNFk4ZlV3ek9IT3ZaSUpudDdCU2o4UTZxR0RXQStET3NqYkt0b3hlYz0iLCJtYWMiOiI2MmY1YjNiNGZlYThjOWVhMjA0YmNmZDg3MmJjOTEyZWJlNDdkYzI3MDAwODAzMmZiMTNmOWMwMTY0MzU2YmE1In0%3D; _gat=1; XSRF-TOKEN=eyJpdiI6IlZRb21iN3BTU2dqNFFha05hWmQwVVE9PSIsInZhbHVlIjoibjNPK25PK0tENHI5eDB0OXRMQk8rYnRiNDVyN2hmZHMyekJUY3hEYTVtVmxvNERqS0RmaDllVEtLQ3ZcL3JiRXhlZDl0ckw0YVlORTJVSmo5T3QzTld3PT0iLCJtYWMiOiIzNmFhY2YyY2YyNjdmZjNhYWM3YWM2MzYzMzRmZThiNDI5MDEzMmUzZWM5NzBhZTg0ZTk4MDZiMDEzMmU3M2Q0In0%3D; _session=eyJpdiI6IkpzVjkwWEM1SFwvdytiSjB6UW9MOU5nPT0iLCJ2YWx1ZSI6ImpkbEN3cHI2MGZRNkhlT2I4Vll2TDFBQ2hBSFhVNmhNQkczeE1sK2lqYU5XYjFBQzdJQ0xVbm5TNlJTMDZnc3NBYzkrZ3pWajNTdUljZ0k3VXBCM2ZnPT0iLCJtYWMiOiJjZjU5YTYzNDUzOGU4MGY4ZGZkYzViYTdiNDUxZjZhNTMwNTE5MmZjNWVhNGZjMzg4MjYwMTg5YzA4YWFiMzJjIn0%3D; SERVERID=4f5f69a3e569b9cd359e6a82e64e12fb|1551767173|1551766674'
  }
}

const req = https.request(options, (res) => {
  console.log('状态码:', res.statusCode)
  console.log('请求头:', res.headers)

  res.on('data', (d) => {
    console.log('123123123')
  })
})

console.dir(req.getHeader('cookie'))
req.write(data)

req.on('error', (e) => {
  console.error(e)
})
req.end()

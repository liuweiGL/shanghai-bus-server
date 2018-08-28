/**
 *
 * @Description 邮件发送
 *
 */

const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const config = {
  server: 'QQ',
  email: {
    user: '1289937269@qq.com',
    pass: 'dhlvmsrtxaaehdbh'
  }
}

const transport = nodemailer.createTransport(
  smtpTransport({
    service: config.server,
    auth: {
      user: config.email.user,
      pass: config.email.pass
    }
  })
)

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
const sendMail = function(recipient, subject, html) {
  transport.sendMail(
    {
      from: config.email.user,
      to: recipient,
      subject: subject,
      html: html
    },
    function(error) {
      if (error) {
        console.error(error)
      }
    }
  )
}

module.exports = sendMail

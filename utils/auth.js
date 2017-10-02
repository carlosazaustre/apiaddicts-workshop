'use strict'

const jwt = require('jsonwebtoken')

function sign (payload, secret, cb) {
  return jwt.sign(payload, secret, cb)
}

function verify (token, secret, cb) {
  return jwt.verify(token, secret, cb)
}

module.exports = {
  sign,
  verify
}

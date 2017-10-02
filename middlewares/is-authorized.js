'use strict'

const debug = require('debug')('apiaddicts:api:routes:middleware')
const jwt = require('express-jwt')

const auth = { secret: process.env.SECRET || 'apiaddicts' }

function isAuthorized (req, res, next) {
  const { user } = req

  if (!user || !user.username) {
    return next(new Error('Not Authorized'))
  }

  debug(`user: ${user}`)
  jwt(auth)
}

module.exports = isAuthorized

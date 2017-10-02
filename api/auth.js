'use strict'

const debug = require('debug')('apiaddicts:api:routes:auth')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const secret = process.env.SECRET || 'apiaddicts'

promisify(jwt.sign)
promisify(jwt.verify)

// POST /api/auth - generate a new token based in info requested
async function generateToken (req, res, next) {
  const { username } = req.body
  const payload = {
    username
  }
  
  debug(`payload: ${JSON.stringify(payload)}`)
  let token = ''
  try {
    token = await jwt.sign(payload, secret)
  } catch (e) {
    return next(e)
  }

  res.send({ token })
}

// GET /api/auth/:token - Decode a token to user data payload
async function decodeToken (req, res, next) {
  const { token } = req.params

  let user = {}
  try {
    user = await jwt.verify(token, secret)
  } catch (e) {
    return next(e)
  }

  res.send({ user })
}

module.exports = {
  generateToken,
  decodeToken
}
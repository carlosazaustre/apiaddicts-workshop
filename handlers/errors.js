'use strict'

const debug = require('debug')('apiaddicts:api:errors')
const chalk = require('chalk')

// Throw error if user request is not token authorized
function throwErrorIfNotAuthorized (req, next) {
  if (!req.user || !req.user.username) {
    return next(new Error('Not Authorized'))
  }
}

// Throw error if user is not admin
function throwErrorIfNotAdmin (req, next) {
  if (!req.user.admin) {
    return next(new Error('The user has not admin privileges'))
  }
}

// Express response error handler
function handleExpressError (err, req, res, next) {
  debug(`${chalk.red('[error]')}: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  if (err.message.match(/not authorized/)) {
    return res.status(403).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
}

// Handle regular errors
function handleError (err) {
  debug(`${chalk.red('[error]')} Failed to connect to DB on startup: ${err.message}`)
  console.error(err.stack)
}

// Handle Fatal errors
function handleFatalError (err) {
  debug(`${chalk.red('[fatal error]')}: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

// Handle Database connection errors
function handleDBError (err) {
  debug(`${chalk.red('[error]')}: ${err.message}`)
  console.error(err.stack)
}

module.exports = {
  handleError,
  handleExpressError,
  handleFatalError,
  handleDBError,
  throwErrorIfNotAuthorized,
  throwErrorIfNotAdmin
}

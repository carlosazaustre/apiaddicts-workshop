'use strict'

const debug = require('debug')('apiaddicts:api:errors')
const chalk = require('chalk')

// Express error handler
function handleExpressError (err, req, res, next) {
  debug(`${chalk.red('[error]')}: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  if (err.message.match(/authorized/)) {
    return res.status(403).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
}

// Handle regular errors
function handleError (err) {
  debug(`${chalk.red('[error]')}: ${err.message}`)
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
  handleDBError
}

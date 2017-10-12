'use strict'

const debug = require('debug')('apiaddicts:api:errors')
const chalk = require('chalk')
const mongoose = require('mongoose')

// Express response error handler
function handleExpressError (err, req, res, next) {
  debug(`${chalk.red('[error]')}: ${err.message}`)
  console.error(err.stack)

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

// Handle Database disconnect exit
function handleDisconnectedExit () {
  debug('Mongoose default connection disconnected')
}

// Handle Database disconnect by closing application
function handleGracefulExit () {
  mongoose.connection.close(() => {
    debug(`Mongoose default connection with DB ${process.env.MONGO_URL} is disconnected through app termination`)
    process.exit(0)
  })
}

module.exports = {
  handleError,
  handleExpressError,
  handleFatalError,
  handleDBError,
  handleDisconnectedExit,
  handleGracefulExit
}

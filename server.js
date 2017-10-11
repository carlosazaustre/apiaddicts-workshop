'use strict'

const debug = require('debug')('apiaddicts:api')
const chalk = require('chalk')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const helmet = require('helmet')

const errors = require('./handlers/errors')
const api = require('./api')

const port = process.env.PORT || 3000
const db = process.env.MONGO_URL || 'mongodb://localhost/apiaddicts'
const app = asyncify(express())
const server = http.createServer(app)

mongoose.Promise = global.Promise

// help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet())

// All API endpoint routes are in /api/<endpoint>
app.use('/api', api)
app.use(errors.handleExpressError)

// https://stackoverflow.com/questions/20769790/use-of-module-parent-in-nodejs
if (!module.parent) {
  // Connect to database and then to the Node API Server
  try {
    mongoose.connect(db, { useMongoClient: true })
    debug(`Trying to connect to DB ${db}`)
  } catch (err) {
    debug(`${chalk.red('[error]')} Server initialization failed ${err.message}`)
  }
}

// Listeners
process.on('uncaughtException', errors.handleFatalError)
process.on('unhandledRejection', errors.handleFatalError)
process.on('SIGINT', gracefulExit)

mongoose.connection.on('connected', launchServer)
mongoose.connection.on('disconnected', disconnectedExit)
mongoose.connection.on('error', errors.handleDBError)

// Handlers
function launchServer () {
  debug(`Connected to ${db} Database`)
  server.listen(port, () => {
    debug(`server running on port ${port}`)
  })
}

function disconnectedExit () {
  debug('Mongoose default connection disconnected')
}

function gracefulExit () {
  mongoose.connection.close(() => {
    debug(`Mongoose default connection with DB ${process.env.MONGO_URL} is disconnected through app termination`)
    process.exit(0)
  })
}

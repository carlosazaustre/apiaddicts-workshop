'use strict'

const debug = require('debug')('apiaddicts:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const helmet = require('helmet')

const errors = require('./handlers/errors')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

mongoose.Promise = Promise

// help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet())

// All API endpoint routes are in /api/<endpoint>
app.use('/api', api)
app.use(errors.handleExpressError)

// Start server if we're not someone else's dependency
// https://stackoverflow.com/questions/20769790/use-of-module-parent-in-nodejs
if (!module.parent) {
  // Connect to database
  mongoose.connect(process.env.MONGO_URL, { useMongoClient: true }, () => {
    debug('Mongoose default connection open')
    // Run Express server
    server.listen(port, () => {
      debug(`server running on port ${port}`)
    })
  })
}

process.on('uncaughtException', errors.handleFatalError)
process.on('unhandledRejection', errors.handleFatalError)
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    debug('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
mongoose.connection.on('error', errors.handleDBError)
mongoose.connection.on('disconnected', () => {
  debug('Mongoose default connection disconnected')
})

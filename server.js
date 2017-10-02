'use strict'

const debug = require('debug')('apiaddicts:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const helmet = require('helmet')

const errors = require('./utils/errors')
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

// You can use module.parent to determine if the current script is loaded by another script.
// https://stackoverflow.com/questions/20769790/use-of-module-parent-in-nodejs
if (!module.parent) {
  process.on('uncaughtException', errors.handleFatalError)
  process.on('unhandledRejection', errors.handleFatalError)
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debug('Mongoose default connection disconnected through app termination'); 
      process.exit(0);
    })
  })

  // Connect to database
  mongoose.connect('mongodb://localhost/apiaddicts', { useMongoClient: true })
  mongoose.connection.on('error', errors.handleDBError)
  mongoose.connection.on('disconnected', () => {
    debug('Mongoose default connection disconnected')
  })
  mongoose.connection.on('connected', () => {
    debug('Mongoose default connection open')
    // Run Express server
    server.listen(port, () => {
      debug(`server running on port ${port}`)
    })
  })
}

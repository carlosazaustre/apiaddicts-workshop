'use strict'

const debug = require('debug')('apiaddicts:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const helmet = require('helmet')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

mongoose.Promise = Promise

// help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet())

// All API endpoint routes are in /api/<endpoint>
app.use('/api', api)

// Connect to database
mongoose.connect('mongodb://localhost/apiaddicts', {
  useMongoClient: true
})

// Run Express server
server.listen(port, () => {
  debug(`server running on port ${port}`)
})
'use strict'

const debug = require('debug')('apiaddicts:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

mongoose.Promise = Promise

app.use('/api', api)

mongoose.connect('mongodb://localhost/apiaddicts', {
  useMongoClient: true
})

server.listen(port, () => {
  debug(`server running on port ${port}`)
})
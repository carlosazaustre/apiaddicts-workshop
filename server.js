'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const mongoose = require('mongoose')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

mongoose.connect('mongodb://localhost/apiaddicts', {
  useMongoClient: true,
  promiseLibrary: global.Promise
})

server.listen(port, () => {
  console.log(`[api] server running on port ${port}`)
})
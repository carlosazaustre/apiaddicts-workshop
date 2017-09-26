'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

server.listen(port, () => {
  console.log(`[api] server running on port ${port}`)
})
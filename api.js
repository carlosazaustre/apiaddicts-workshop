'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')
const uuid = require('uuid')
const db = require('./data.js')

const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

api.get('/movies', (req, res, next) => {
  res.send({})
})

api.get('/movie/:id', (req, res, next) => {
  res.send({})
})

api.delete('/movie/:id', (req, res, next) => {
  res.send({})
})

api.post('/movie', (req, res, next) => {
  res.send({})
})

module.exports = api

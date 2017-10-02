'use strict'

const express = require('express')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')

const isAuthorized = require('../middlewares/is-authorized')
const movies = require('./movies')
const auth = require('./auth')

const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.post('/auth', auth.generateToken)
api.get('/auth/:token', auth.decodeToken)

api.get('/movies', isAuthorized, movies.fetchAll)
api.get('/movie/:id', isAuthorized, movies.fetchById)
api.post('/movie', isAuthorized, guard.check(['movies:write']), movies.save)
api.delete('/movie/:id', isAuthorized, movies.remove)

module.exports = api

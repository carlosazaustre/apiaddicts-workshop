'use strict'

const express = require('express')
const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')

const config = require('../config')
const movies = require('./movies')
const auth = require('./auth')
const { isAdmin, isAuthorized } = require('../middlewares/authorization')

const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.post('/auth', auth.generateToken)
api.get('/auth/:token', auth.decodeToken)

api.get('/movies', jwt(config.auth), isAuthorized, movies.fetchAll)
api.get('/movie/:id', jwt(config.auth), isAuthorized, movies.fetchById)
api.post('/movie', jwt(config.auth), guard.check(['movies:write']), movies.save)
api.delete('/movie/:id', jwt(config.auth), isAdmin, movies.remove)

module.exports = api

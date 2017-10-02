'use strict'

const debug = require('debug')('apiaddicts:api:routes')
const express = require('express')
const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')

const Movie = require('./models/movie')

const auth = { secret: process.env.SECRET || 'apiaddicts' }
const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.get('/movies', jwt(auth), async (req, res, next) => {
  debug('GET /api/movies')
  const movies = await Movie.find({})
  res.send(movies)
})

api.post('/movie', jwt(auth), guard.check(['movies:write']), async (req, res, next) => {
  const movie = req.body
  debug(`POST /api/movie ${movie}`)
  await Movie.create(movie)
  res.send(movie)
})

api.get('/movie/:id', jwt(auth), async (req, res, next) => {
  const { id } = req.params
  debug(`GET /api/movie/${id}`)
  const movie = await Movie.findById(id)
  res.send(movie)
})

api.delete('/movie/:id', jwt(auth), async (req, res, next) => {
  const { id } = req.params
  debug(`DELETE /api/movie/${id}`)
  await Movie.findByIdAndRemove(id)
  res.send({ message: `Movie with ID: ${id} has been deleted`})
})

module.exports = api

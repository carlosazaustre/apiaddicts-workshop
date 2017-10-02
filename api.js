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
// Handle JWT authorization
api.use(isAuthorized)

function isAuthorized (req, res, next) {
  const { user } = req

  if (!user || !user.username) {
    return next(new Error('Not Authorized'))
  }

  debug(`user: ${user}`)
  jwt(auth)
}

// API Routes
// GET /api/movies - Fetch all the movies on DB
api.get('/movies', isAuthorized, async (req, res, next) => {
  debug(`GET /api/movies`)

  let movies = []
  try {
    movies = await Movie.find({})
  } catch (e) {
    return next(e)
  }

  res.send(movies)
})

// POST /api/movie - Save a new movie on DB
api.post('/movie', isAuthorized, guard.check(['movies:write']), async (req, res, next) => {
  const movie = req.body
  debug(`POST /api/movie ${movie.toJSON()}`)

  let savedMovie = {}
  try {
    await Movie.create(movie)
    savedMovie = await Movie.find({ title: movie.title })
  } catch (e) {
    return next(e)
  }

  res.send(savedMovie)
})

api.get('/movie/:id', isAuthorized, async (req, res, next) => {
  const { id } = req.params
  debug(`GET /api/movie/${id}`)

  let movie = {}
  try {
    movie = await Movie.findById(id)
  } catch (e) {
    return next(e)
  }

  res.send(movie)
})

api.delete('/movie/:id', isAuthorized, async (req, res, next) => {
  const { id } = req.params
  debug(`DELETE /api/movie/${id}`)

  try {
    await Movie.findByIdAndRemove(id)
  } catch (e) {
    return next(e)
  }

  res.send({ message: `Movie with ID: ${id} has been deleted` })
})

module.exports = api

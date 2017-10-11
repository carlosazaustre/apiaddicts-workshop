'use strict'

const debug = require('debug')('apiaddicts:api:routes:movies')
const Movie = require('../models/movie')

function launchErrorIfNotAuthorized (req, next) {
  if (!req.user || !req.user.username) {
    return next(new Error('Not Authorized'))
  }
}

function launchErrorIfNotAdmin (req, next) {
  if (!req.user.admin) {
    return next(new Error('The user has not admin privileges'))
  }
}

// GET /api/movies - Fetch all the movies on DB
async function fetchAll (req, res, next) {
  launchErrorIfNotAuthorized(req, next)
  debug(`GET /api/movies`)

  let movies = []
  try {
    movies = await Movie.find({})
  } catch (e) {
    return next(e)
  }

  if (movies.length < 1) {
    return res.send({ message: 'DB has not records yet' })
  }

  res.send(movies)
}

// GET /api/movie/:id - Fetch a movie by Id
async function fetchById (req, res, next) {
  launchErrorIfNotAuthorized(req, next)

  const { id } = req.params
  debug(`GET /api/movie/${id}`)

  let movie = {}
  try {
    movie = await Movie.findById(id)
  } catch (e) {
    return next(e)
  }

  if (!movie) {
    return next(new Error(`Movie with id ${id} was not found`))
  }

  res.send(movie)
}

// POST /api/movie - Add a new movie to DB
async function save (req, res, next) {
  launchErrorIfNotAuthorized(req, next)

  const movie = req.body
  debug(`POST /api/movie ${JSON.stringify(movie)}`)

  let savedMovie = {}
  try {
    savedMovie = await Movie.create(movie)
  } catch (e) {
    return next(e)
  }

  res.send(savedMovie)
}

// DELETE /api/movie/:id - Removes a Movie by Id from the DB
async function remove (req, res, next) {
  launchErrorIfNotAuthorized(req, next)
  launchErrorIfNotAdmin(req, next)

  const { id } = req.params
  debug(`DELETE /api/movie/${id}`)

  try {
    await Movie.findByIdAndRemove(id)
  } catch (e) {
    return next(e)
  }

  res.send({ message: `Movie with ID: ${id} has been deleted` })
}

module.exports = {
  fetchAll,
  fetchById,
  save,
  remove
}

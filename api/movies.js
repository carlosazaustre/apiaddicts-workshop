'use strict'

const debug = require('debug')('apiaddicts:api:routes:movies')
const Movie = require('../models/movie')
const {
  MovieNotFoundError,
  DatabasHasNotRecordsError
} = require('../handlers/custom-errors')

// GET /api/movies - Fetch all the movies on DB
async function fetchAll (req, res, next) {
  debug(`GET /api/movies`)

  try {
    let movies = await Movie.find({})

    if (movies.length < 1) {
      return next(new DatabasHasNotRecordsError())
    }

    res.send(movies)
  } catch (e) {
    return next(e)
  }
}

// GET /api/movie/:id - Fetch a movie by Id
async function fetchById (req, res, next) {
  const { id } = req.params
  debug(`GET /api/movie/${id}`)

  try {
    let movie = await Movie.findById(id)

    if (!movie) {
      return next(new MovieNotFoundError(id))
    }

    res.send(movie)
  } catch (e) {
    return next(e)
  }
}

// POST /api/movie - Add a new movie to DB
async function save (req, res, next) {
  const movie = req.body
  debug(`POST /api/movie ${JSON.stringify(movie)}`)

  try {
    let savedMovie = await Movie.create(movie)
    res.send(savedMovie)
  } catch (e) {
    return next(e)
  }
}

// DELETE /api/movie/:id - Removes a Movie by Id from the DB
async function remove (req, res, next) {
  const { id } = req.params
  debug(`DELETE /api/movie/${id}`)

  try {
    await Movie.findByIdAndRemove(id)
    res.send({ message: `Movie with ID: ${id} has been deleted` })
  } catch (e) {
    return next(e)
  }
}

module.exports = {
  fetchAll,
  fetchById,
  save,
  remove
}

'use strict'

const debug = require('debug')('apiaddicts:api:routes:movies')
const Movie = require('../models/movie')

// GET /api/movies - Fetch all the movies on DB
async function fetchAll (req, res, next) {
  debug(`GET /api/movies`)

  let movies = []
  try {
    movies = await Movie.find({})
  } catch (e) {
    return next(e)
  }

  res.send(movies)
}

// GET /api/movie/:id - Fetch a movie by Id
async function fetchById (req, res, next) {
  const { id } = req.params
  debug(`GET /api/movie/${id}`)

  let movie = {}
  try {
    movie = await Movie.findById(id)
  } catch (e) {
    return next(e)
  }

  res.send(movie)
}

// POST /api/movie - Add a new movie to DB
async function save (req, res, next) {
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
}

// DELETE /api/movie/:id - Removes a Movie by Id from the DB
async function remove (req, res, next) {
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

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const asyncify = require('express-asyncify')
const uuid = require('uuid')

const Movie = require('./models/movie')
const api = asyncify(express.Router())

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
api.use(bodyParser.json())

// API Routes
api.get('/movies', async (req, res, next) => {
  const movies = await Movie.find({})
  res.send(movies)
})

api.post('/movie', async (req, res, next) => {
  const movie = req.body
  await Movie.create(movie)
  res.send(movie)
})

api.get('/movie/:id', async (req, res, next) => {
  const { id } = req.params
  const movie = await Movie.findById(id)
  res.send(movie)
})

api.delete('/movie/:id', async (req, res, next) => {
  const { id } = req.params
  await Movie.findByIdAndRemove(id)
  res.send({ message: `Movie with ID: ${id} has been deleted`})
})



module.exports = api

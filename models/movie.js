'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = Schema({
  title: String,
  summary: String,
  year: String,
  type: String
})

module.exports = mongoose.model('Movie', movieSchema)

'use strict'

class MovieNotFoundError extends Error {
  constructor (id) {
    super()
    this.message = `Movie with ID ${id} was not found`
  }
}

module.exports = {
  MovieNotFoundError
}

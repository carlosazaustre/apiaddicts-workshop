'use strict'

class MovieNotFoundError extends Error {
  constructor (id) {
    super()
    this.message = `Movie with ID ${id} was not found`
  }
}

class DatabasHasNotRecordsError extends Error {
  constructor () {
    super()
    this.message = 'DB has not records yet'
  }
}

class NotAuthorizedError extends Error {
  constructor () {
    super()
    this.message = `The user is not authorized`
  }
}

class NotAdminError extends Error {
  constructor (username) {
    super()
    this.message = `The user ${username} has not admin privileges and is not authorized`
  }
}

module.exports = {
  MovieNotFoundError,
  DatabasHasNotRecordsError,
  NotAuthorizedError,
  NotAdminError
}

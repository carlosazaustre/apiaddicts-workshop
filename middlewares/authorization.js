'use strict'

const {
  NotAuthorizedError,
  NotAdminError
} = require('../handlers/custom-errors')

// Check if the user is authorized by token
function isAuthorized (req, res, next) {
  if (!req.user || !req.user.username) {
    return next(new NotAuthorizedError())
  }
  next()
}

// Check if the user is admin through token authorization
function isAdmin (req, res, next) {
  if (!req.user.admin) {
    return next(new NotAdminError(req.user.username))
  }
  next()
}

module.exports = {
  isAuthorized,
  isAdmin
}

'use strict'

// Check if the user is authorized by token
function isAuthorized (req, res, next) {
  if (!req.user || !req.user.username) {
    return next(new Error('Not Authorized'))
  }
  next()
}

// Check if the user is admin through token authorization
function isAdmin (req, res, next) {
  if (!req.user && !req.user.admin) {
    return next(new Error('The user has not admin privileges'))
  }
  next()
}

module.exports = {
  isAuthorized,
  isAdmin
}

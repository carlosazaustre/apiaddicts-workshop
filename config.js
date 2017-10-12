'use strict'

module.exports = {
  auth: {
    secret: process.env.SECRET || 'apiaddicts',
  },
  port: process.env.PORT || 3000,
  database: process.env.MONGO_URL || 'mongodb://localhost/apiaddicts'
}

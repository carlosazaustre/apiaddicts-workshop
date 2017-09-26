'use strict'

const express = require('express')
const asyncify = require('express-asyncify')

const api = asyncify(express.Router())

module.exports = api

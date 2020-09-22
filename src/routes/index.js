const express = require('express')
const routes = express.Router()

const home = require('../app/controllers/home')

const products = require('./products')
const users = require('./users')

//Home
routes.get('/', home.index)
routes.use('/products', products)
routes.use('/users', users)


module.exports = routes
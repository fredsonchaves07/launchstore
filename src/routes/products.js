const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const {onlyUsers} = require('../app/middlewares/session')

const products = require('../app/controllers/ProductController')
const search = require('../app/controllers/SearchController')

//Search
routes.get('/search', search.index)

//Products
routes.get('/create', onlyUsers, products.create)
routes.get('/:id', products.show)
routes.get('/:id/edit', onlyUsers, products.edit)

routes.post('/', onlyUsers, multer.array("photos", 6), products.post)
routes.put('/', onlyUsers, multer.array("photos", 6), products.put)
routes.delete('/', onlyUsers, products.delete)

//Search
routes.get('/search', search.index)

module.exports = routes
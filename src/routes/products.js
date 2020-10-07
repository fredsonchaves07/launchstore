const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const products = require('../app/controllers/ProductController')
const search = require('../app/controllers/SearchController')

//Search
routes.get('/search', search.index)

//Products
routes.get('/create', products.create)
routes.get('/:id', products.show)
routes.get('/:id/edit', products.edit)

routes.post('/', multer.array("photos", 6), products.post)
routes.put('/', multer.array("photos", 6), products.put)
routes.delete('/', products.delete)

//Search
routes.get('/search', search.index)

module.exports = routes
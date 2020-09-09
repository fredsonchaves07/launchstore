const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const products = require('./app/controllers/product')
const home = require('./app/controllers/home')
const search = require('./app/controllers/search')

//Home
routes.get('/', home.index)

//Search
routes.get('/products/search', search.index)

//Products
routes.get('/products/:id', products.show)
routes.get('/products/create', products.create)
routes.get('/products/:id/edit', products.edit)

routes.post('/products', multer.array("photos", 6), products.post)
routes.put('/products', multer.array("photos", 6), products.put)
routes.delete('/products', products.delete)

//Search
routes.get('/products/search', search.index)



module.exports = routes
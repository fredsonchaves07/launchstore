const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const products = require('./app/controllers/product')

routes.get('/', (req, res) =>{
    return res.render('layout.njk')
})

routes.get('/products/:id', products.show)
routes.get('/products/create', products.create)
routes.get('/products/:id/edit', products.edit)



routes.post('/products', multer.array("photos", 6), products.post)
routes.put('/products', multer.array("photos", 6), products.put)
routes.delete('/products', products.delete)

module.exports = routes
const express = require('express')
const routes = express.Router()
const products = require('./app/controllers/product')

routes.get('/', (req, res) =>{
    return res.render('layout.njk')
})

routes.get('/ads/create', (req, res) => {
    return res.redirect('/products/create')
})


routes.get('/products/create', products.create)


module.exports = routes
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create(req, res){
        Category.all().then(
            (results) => {
                const categories = results.rows
                return res.render('products/create.njk', {categories})
            }
        ).catch((err) => { 
            throw new Error(err)
        })
        
    },

    async post(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ''){
                return res.send('Fill al fields!')
            }
        }

        let results = await Product.create(req.body)
        const product = results.rows[0]

        results = await Category.all()
        const categories = results.rows

        return res.render('products/create.njk', {categories, product})
    }
}
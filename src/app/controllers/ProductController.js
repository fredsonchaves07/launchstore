const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
const utils = require('../lib/utils')
const { formatPrice } = require('../lib/utils')

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

        // Verifica se arquivo está vazio  
        if(req.files.length == 0){
            return res.send('Please, send at least one image')
        }

        req.body.user_id = req.session.user_id
        let results = await Product.create(req.body)
        const productId =results.rows[0].id

        // Criando um array de promessas pois o for each não ler a promessa
        const filePromise = req.files.map(file => File.create({...file, product_id: productId}))
        await Promise.all(filePromise)

        return res.redirect(`/products/${productId}`)
    },

    async edit(req, res){
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product) {
            return res.send('Product not found!')
        }

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        results = await Category.all()
        const categories = results.rows

        // Recebendo a imagem
        results = await Product.files(product.id)
        let files = results.rows

        // Atualizando colocando o endereço correto onde está a imagem
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.header.host}${file.path.replace('public', '')}`
        }))

        


        return res.render('products/edit.njk', {product, categories, files})
    },

    async put(req, res){
        if(req.files.length != 0){
            const newFilePromise = req.files.map(file => {
                File.create({...file, product_id: req.body.id})
            })

            await Promise.all(newFilePromise)
        }
        
        if(req.body.removed_files){
            const removedFiles = req.body.removed_files.split(',')
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => {
                File.delete(id)
            })

            await Promise.all(removedFilesPromise)
        }

        req.body.price = req.body.price.replace(/\D/g, "")

        if(req.body.old_price != req.body.price){
            const oldProduct = await Product.find(req.body.id)

            req.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(req.body)

        let results = await Product.find(req.body.id)
        const product = results.rows[0]

        const filesPromise = req.files.map(file => File.create({
            ...file,
            product_id: product.id
        }))

        await Promise.all(filesPromise)

        return res.redirect(`/products/${product.id}`)

    },

    async delete(req, res){
        await Product.delete(req.body.id)

        return res.redirect('/')
    },

    async show(req, res){
        /*TODO: Implementar data e hora no cadastro */
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product){
            return res.send('Product not Found!')
        }

        product.oldPrice = formatPrice(product.old_price)
        product.price = formatPrice(product.price)

        // Chama as imagens 
        results = await Product.files(product.id)
        const files = results.rows.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return res.render('products/show', {product, files})
    }
}
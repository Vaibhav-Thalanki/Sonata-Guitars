const {productService} = require('../services/')

const productController = {
async addProduct(req,res,next){
    try{
        const product = await productService.addProduct(req.body)
        res.json(product)
    }
    catch(err){
        next(err)
    }
},
async getProductById(req,res,next){
    try{
        const _id = req.params.id
        const product = await productService.getProductById(_id)
        res.json(product)
    }
    catch(err){
        next(err)
    }
},
async updateProductById(req,res,next){
    try{
        const _id = req.params.id
        const product = await productService.updateProductById(_id,req.body)
        res.json(product)
    }
    catch(err){
        next(err)
    }
},
async deleteProductById(req,res,next){
    try{
        const _id = req.params.id
        const product = await productService.deleteProductById(_id)
        res.json(product)
    }
    catch(err){
        next(err)
    }
},
async getAllProducts(req,res,next){
    try{
        const _id = req.params.id
        const products = await productService.getAllProducts(req)
        res.json(products)
    }
    catch(err){
        next(err)
    }
},
async paginateProducts(req,res,next){
    try{
        const products = await productService.paginateProducts(req)
        res.json(products)
    }
    catch(err){
        next(err)
    }
},
async picUpload(req,res,next){
    try{
        const pic = await productService.picUpload(req)
        res.json(pic);

    }
    catch(err){
        next(err)
    }
}
}


module.exports = productController



// {
//     "model":"Jet bt gold",
//     "brand":"65992ed9d6ad049c40d042a9",
//     "frets":22,
//     "woodtype":"Mahogany",
//     "description":"Standard product, loved by its customers, good option if you're a first timer",
//     "price":2400,
//     "available":5,
//     "itemsSold":1,
//     "shipping":true
// }
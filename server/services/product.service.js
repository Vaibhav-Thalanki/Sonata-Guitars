const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const {Product} = require('../models/product')
const mongoose = require('mongoose')

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dugbh32r1', 
    api_key: '991462265625843',
    api_secret: process.env.CN_API_SECRET
})

const addProduct = async(body)=>{
    try{
        const product = new Product({
            ...body
        })
        await product.save();
        return product
    }
    catch(error){
        throw error
    }
}

const getProductById = async(_id)=>{
    try{
        const product = await Product.findById(_id).populate('brand')
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product Not Found')
        return product
    }
    catch(error){
        throw new ApiError(httpStatus.NOT_FOUND,'Product Not Found')
    }
}

const updateProductById = async(_id,body)=>{
    try{
        const product = await Product.findOneAndUpdate({_id},{"$set":body},{new:true})
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product Not Found')
        return product
    }
    catch(error){
        throw error
    }
}

const deleteProductById = async(_id)=>{
    try{
        const product = await Product.findOneAndDelete({_id})
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product Not Found')
        return product
    }
    catch(error){
        throw error
    }
}

const getAllProducts = async(req)=>{
    try{
        const limit = parseInt(req.query.limit)|| 3
        const order = req.query.order || 'desc'
        const sortBy = req.query.sortBy || 'date'
        const products = await Product.find({}).populate('brand').sort([
            [sortBy,order]
        ]).limit(limit)
        return products
    }
    catch(error){
        throw error
    }
}


const paginateProducts = async(req)=>{
    try{
        let aggQueryArray = [];

        if(req.body.keywords && req.body.keywords!=''){
            const re = new RegExp(`${req.body.keywords}`,'gi');
            aggQueryArray.push({
                $match: {model:{$regex: re}}
            })
        }

        if(req.body.brand && req.body.brand.length>0){
            let newBrandArray = req.body.brand.map((item)=>(
                new mongoose.Types.ObjectId(item)
            ))
            aggQueryArray.push({
                $match:{brand:{$in: newBrandArray}}
            })
        }

        if(req.body.frets && req.body.frets.length>0){
            aggQueryArray.push({
                $match:{frets:{$in: req.body.frets}}
            })
        }

        if((req.body.min && req.body.min>0)){
                aggQueryArray.push({
                    $match:{price:{$gt:req.body.min}}
                })
        }
        if((req.body.max && req.body.max<5000)){
            aggQueryArray.push({
                $match:{price:{$lt:req.body.max}}
            })
        }
        // add populate
        aggQueryArray.push(
            {
                $lookup:{
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as:"brand"
                }
            }
        )
        //since only one unique brand id
        aggQueryArray.push({$unwind:"$brand"})
        
        let aggQuery= Product.aggregate(aggQueryArray)
        const options = {
            page: req.body.page,
            limit: 6,
            sort: {date:'desc'}
        }
        const products = await Product.aggregatePaginate(aggQuery,options)
        return products
    }
    catch(error){
        throw error
    }
}

const picUpload = async(req)=>{
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.path,{
            public_id: `${Date.now()}`,
            folder: 'waves_upload'
        })
        console.log(upload);
        return {
            public_id:upload.public_id,
            url: upload.url
        }
    }
    catch(err){
        throw err
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
    paginateProducts,
    picUpload
}
const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');
const {Brand} = require('../models/brand')


const addBrand = async(brandname)=>{
    try{
        const brand = new Brand({
            name: brandname
        });
        await brand.save();
        return brand
    }
    catch(err){
        throw err
    }
}
const getBrandById = async(id)=>{
    try{
        const brand = await Brand.findById(id)
        if(!brand) throw new ApiError(httpStatus.NOT_FOUND,'Brand Not Found')
        return brand
    }
    catch(error){
        throw error
    }
}
const deleteBrandById = async(id)=>{
    try{
       const brand = await Brand.findOneAndDelete({_id:id})
        return brand
    }
    catch(error){
        throw error
    }

}
const getBrands = async(req)=>{
    try{
        let order = req.order? req.order:'desc'

        let limit = req.limit || 100
        const brands =  await Brand.find({}).sort([
            ["_id",order]
        ]).limit(limit)
        if(!brands){
            throw new ApiError(httpStatus.NOT_FOUND, 'No Brands Available')
        }
        return brands
     }
     catch(error){
         throw error
     }
}

module.exports = {
    addBrand,
    getBrandById,
    deleteBrandById,
    getBrands
}
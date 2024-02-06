const { brandService } = require('../services')
const {} = require('../services/brand.service')
const brandControllers = {
    async addBrand(req,res,next){
        try{
            const brand = await brandService.addBrand(req.body.brandname);
            res.json(brand)
        }
        catch(err){
            next(err)
        }
    },
    async getBrand(req,res,next){
        try{
            const id = req.params.id
            const brand = await brandService.getBrandById(id)
            res.json(brand)

        }catch(err){
            next(err)
        }
    },
    async deleteBrandById(req,res,next){
        try{
            const id = req.params.id
            const brand = await brandService.deleteBrandById(id);
            res.json(brand)

        }catch(err){
            next(err)
        }
    },
    async getBrands(req,res,next){
        try{
            const brands = await brandService.getBrands(req.body)
            res.json(brands)
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = brandControllers
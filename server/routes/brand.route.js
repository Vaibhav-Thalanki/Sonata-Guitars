const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')
const brandControllers = require('../controllers/brand.controller')

router.post('/brand',auth('createAny','brand'),brandControllers.addBrand)

router.route('/brand/:id')
.get(brandControllers.getBrand)
.delete(auth('deleteAny','brand'),brandControllers.deleteBrandById)

router.get('/all',brandControllers.getBrands)


module.exports = router;
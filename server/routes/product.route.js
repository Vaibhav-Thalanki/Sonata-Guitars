const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const auth = require('../middleware/auth')
const {addProductValidator} = require('../middleware/validations')
const formidableMiddleware = require('express-formidable')

router.post('/',auth('createAny','products'),addProductValidator,productController.addProduct)

router.route('/product/:id').get(productController.getProductById).patch(auth('updateAny','products'),productController.updateProductById).delete(auth('deleteAny','products'),productController.deleteProductById)

router.get('/all',productController.getAllProducts)

router.post('/paginate/all',productController.paginateProducts)

// UPLOADING IMAGES
router.post('/upload',auth('createAny','products'),formidableMiddleware(),productController.picUpload)

module.exports = router;
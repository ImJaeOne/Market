const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/upload', productController.uploadProducts);
router.get('/getProducts', productController.getProducts);
router.get('/:productID', productController.getProductDetail);
router.post('/purchase/:productID', productController.purchaseProduct);
router.post('/purchaseCancel/:productID', productController.purchaseCancelProduct);
module.exports = router;

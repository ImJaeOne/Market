const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

router.post('/upload', productController.uploadProducts);
router.get('/getProducts', productController.getProducts);
router.get('/myProducts', productController.myProducts);
router.get('/:productID', productController.getProductDetail);
router.post('/search', productController.searchProduct);
router.post('/purchase/:productID', productController.purchaseProduct);
router.post('/purchaseCancel/:productID', productController.purchaseCancelProduct);

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../database/uploads');
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
});

router.post('/image', upload.single('image'), productController.uploadImage);
module.exports = router;

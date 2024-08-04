const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

//업로드
router.post('/upload', productController.uploadProducts);

//상품 정보
router.get('/getProducts', productController.getProducts);
router.get('/:productID', productController.getProductDetail);
router.post('/search', productController.searchProduct);
router.post('/purchase/:productID', productController.purchaseProduct);
router.post('/purchaseCancel/:productID', productController.purchaseCancelProduct);
router.get('/wishNum/:productID', productController.getWishNum);
router.get('/wish/:productID', productController.getWish);
router.post('/setWish/:productID', productController.setWish);

//마이페이지
router.get('/myProducts/:userID', productController.myProducts);
router.get('/myWish/:userID', productController.myWish);
router.get('/myReply/:userID', productController.myReply);

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

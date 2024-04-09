const productDB = require('../models/productDB');
const userDB = require('../models/userDB');

exports.uploadProducts = async (req, res) => {
    const { productName, productPrice, productDescription, productImgUrl, productCategory, userID } = req.body;
    try {
        await productDB.uploadProducts([
            productName,
            productPrice,
            productDescription,
            productImgUrl,
            productCategory,
            userID,
        ]);
        res.status(200).json('상품 업로드 성공');
    } catch (error) {
        console.log('상품 업로드 에러', error);
        res.status(500).json(`상품 업로드 에러`);
    }
};

exports.getProducts = async (req, res) => {
    await productDB
        .getProducts()
        .then((result) => {
            console.log('get products seccess!');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('get products failed... : ', error);
            res.status(500).json(error);
        });
};

exports.getProductDetail = async (req, res) => {
    const { productID } = req.params;
    console.log(productID);
    await productDB
        .getProductDetail(productID)
        .then((result) => {
            console.log('get productDetail success!');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.error('get productDetail failed... : ', error);
            res.status(500).json(error);
        });
};

exports.purchaseProduct = async (req, res) => {
    const { productID } = req.params;
    await productDB
        .purchaseProduct(productID)
        .then((result) => {
            console.log('purchase success!');
            res.status(200).json({ result: true });
        })
        .catch((error) => {
            console.error('purchase failed... : ', error);
            res.status(500).json(error);
        });
};

exports.purchaseCancelProduct = async (req, res) => {
    const { productID } = req.params;
    await productDB
        .purchaseProduct(productID)
        .then((result) => {
            console.log('purchase success!');
            res.status(200).json({ result: true });
        })
        .catch((error) => {
            console.error('purchase failed... : ', error);
            res.status(500).json(error);
        });
};

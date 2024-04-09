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

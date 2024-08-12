const productDB = require('../models/productDB');

exports.uploadProducts = async (req, res) => {
    const { productName, productPrice, productDescription, productImageUrl, productCategory, userID } = req.body;
    try {
        await productDB.uploadProducts([
            productName,
            productPrice,
            productDescription,
            productImageUrl,
            productCategory,
            userID,
        ]);
        res.status(200).json('상품 업로드 성공');
    } catch (error) {
        console.log('상품 업로드 에러', error);
        res.status(500).json('상품 업로드 에러');
    }
};

exports.getProducts = async (req, res) => {
    const { category } = req.query;
    await productDB
        .getProducts(category)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('상품을 받아올 수 없음', error);
        });
};

exports.getProductDetail = async (req, res) => {
    const { productID } = req.params;
    await productDB
        .getProductDetail(productID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('상품을 받아올 수 없음', error);
        });
};

exports.searchProduct = async (req, res) => {
    const { productName } = req.body;
    console.log(productName);
    await productDB
        .searchProduct(productName)
        .then((result) => {
            res.status(200).json(result);
            console.log(result);
        })
        .catch((error) => res.status(500).json('검색된 상품이 존재하지 않음', error));
};

exports.myProducts = async (req, res) => {
    const userID = req.params.userID;
    await productDB
        .searchMyProduct(userID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('상품을 받아올 수 없음', error);
        });
};

exports.myWish = async (req, res) => {
    const userID = req.params.userID;
    await productDB
        .searchMyWish(userID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('상품을 받아올 수 없음', error);
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
        .purchaseCancel(productID)
        .then((result) => {
            console.log('purchaseCancel success!');
            res.status(200).json({ result: true });
        })
        .catch((error) => {
            console.error('purchaseCancel failed... : ', error);
            res.status(500).json(error);
        });
};

exports.uploadImage = async (req, res) => {
    const file = req.file;
    console.log(file.path);
    try {
        res.status(200).json({ productImageUrl: `${file.filename}` });
    } catch (error) {
        console.log('이미지 업로드 에러:', error);
    }
};

exports.getWishNum = async (req, res) => {
    const productID = req.params.productID;
    await productDB
        .getWishNum(productID)
        .then((result) => {
            res.status(200).json(result[0]);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.getWish = async (req, res) => {
    const productID = req.params.productID;
    const userID = req.query.userID;
    await productDB
        .getWish(productID, userID)
        .then((result) => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.setWish = async (req, res) => {
    const productID = req.params.productID;
    const userID = req.body.userID;
    await productDB
        .getWish(productID, userID)
        .then((result) => {
            if (result.length === 0) {
                productDB
                    .setWish(productID, userID)
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((error) => {
                        res.status(500).json(error);
                    });
            } else {
                productDB
                    .delWish(productID, userID)
                    .then((result) => {
                        res.status(200).json(result);
                    })
                    .catch((error) => {
                        res.status(500).json(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.myReply = async (req, res) => {
    const userID = req.params.userID;
    console.log('myReply:', userID);
    await productDB
        .searchMyReply(userID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('댓글을 받아올 수 없음', error);
        });
};

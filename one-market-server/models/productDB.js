const db = require('../database/db');

exports.uploadProducts = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO product (productName, productPrice, productDescription, productImgUrl, productCategory, userID) values(?,?,?,?,?,?)`,
            [data[0], data[1], data[2], data[3], data[4], data[5]],
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.getProducts = () => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM product`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

//처음에는 product 정보만 가져왔으나 user 정보도 함께 필요하여 Join 사용
exports.getProductDetail = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT product.*, user.userName FROM product JOIN user ON product.userID = user.userID WHERE product.productID = ?`,
            productID,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.purchaseProduct = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE product SET productsoldout = 1 WHERE productID = ?`, productID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.purchaseCancel = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE product SET productsoldout = 0 WHERE productID = ?`, productID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

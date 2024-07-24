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

exports.getProducts = (category) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM product JOIN user ON product.userID = user.userID`;
        if (category && category !== 'all') {
            query += ` WHERE productCategory = '${category}'`;
        }
        query += ` ORDER BY productUploadDate DESC`;
        db.query(query, (error, result) => {
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

exports.searchProduct = (productName) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT product.*, user.userName, user.userEmail FROM product INNER JOIN user ON product.userID = user.userID WHERE product.productName LIKE ?`,
            [`%${productName}%`],
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

exports.searchMyProduct = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT product.*, user.userName, user.userEmail FROM product INNER JOIN user ON product.userID = user.userID WHERE product.userID = ?`,userID,
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

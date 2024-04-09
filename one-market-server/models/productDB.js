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

// exports.getProducts = () => {
//     return new Promise((resolve, reject) => {
//         db.query(`SELECT * FROM product`)
//     })
// }

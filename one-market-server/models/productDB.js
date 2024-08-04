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
            `SELECT product.*, user.userName FROM product INNER JOIN user ON product.userID = user.userID WHERE product.userID = ?`,
            userID,
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

exports.searchMyWish = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT product.*, userName FROM product INNER JOIN user ON product.userID = user.userID WHERE product.productID IN (SELECT wishproduct.productID FROM wishproduct WHERE wishproduct.userID = ? )`,
            userID,
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

exports.searchMyReply = (userID) => {
    return new Promise((resolve, reject) => {
        const getAskQuery = `
            SELECT product.*, ask.askDate, ask.askText, 'ask' AS type
            FROM product
            JOIN ask ON product.productID = ask.productID
            WHERE ask.userID = ?
        `;

        const getAnswerQuery = `
            SELECT product.*, answer.answerDate, answer.answerText, 'answer' AS type
            FROM product
            JOIN answer ON product.productID = answer.productID
            WHERE answer.userID = ?
        `;

        db.query(getAskQuery, userID, (error, askResult) => {
            if (error) {
                return reject(error);
            }

            db.query(getAnswerQuery, userID, (error, answerResult) => {
                if (error) {
                    return reject(error);
                }

                const combinedResults = askResult.concat(answerResult);

                combinedResults.sort((a, b) => {
                    const dateA = a.askDate || a.answerDate;
                    const dateB = b.askDate || b.answerDate;
                    return new Date(dateB) - new Date(dateA);
                });

                resolve(combinedResults);
            });
        });
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

exports.getWishNum = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) as wishCount FROM wishproduct WHERE productID = ?`, productID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getWish = (productID, userID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM wishproduct WHERE productID = ? AND userID = ?`,
            [productID, userID],
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

exports.setWish = (productID, userID) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO wishproduct (productID, userID) VALUES (?, ?)`, [productID, userID], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.delWish = (productID, userID) => {
    return new Promise((resolve, reject) => {
        db.query(`DELETE FROM wishproduct WHERE productID = ? AND userID = ?`, [productID, userID], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

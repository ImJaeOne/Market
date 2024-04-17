const db = require('../database/db');

exports.setAsk = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO ask (askText, productID, userID) values(?,?,?)`,
            [data[0], data[1], data[2], data[3]],
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

exports.getAsk = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT ask.*, user.userName FROM ask JOIN user ON ask.userID = user.userid WHERE ask.productID = ?`,
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

exports.deleteAsk = (askID) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM ask WHERE askID = ?', askID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

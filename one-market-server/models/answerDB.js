const db = require('../database/db');

exports.setAnswer = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO answer (answerText, productID, userID, askID) values(?,?,?,?)`,
            [data[0], data[1], data[2], data[3]],
            (error, result) => {
                if (error) {
                    reject(error);
                    console.log(error);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.getAnswer = (productID) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT answer.*, user.userName FROM answer JOIN user ON answer.userID = user.userID WHERE answer.productID = ?`,
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

exports.deleteAnswer = (answerID) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM answer WHERE answerID = ?', answerID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

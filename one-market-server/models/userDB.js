const db = require('../database/db');

exports.getUser = (userEmail) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user where userEmail = ?`, userEmail, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

exports.signUp = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO user (userEmail, userPW, userName, userPhone) values(?,?,?,?)`,
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

exports.getUserData = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user where userID = ?`, userID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

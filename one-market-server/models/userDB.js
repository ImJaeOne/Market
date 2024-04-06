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
            `INSERT INTO user (userEmail, userPW, userName) values(?,?,?)`,
            [data[0], data[1], data[2]],
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

exports.updateSession = (userID) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE user SET userSession = 1 WHERE userID = ?`, userID, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

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

// exports.editUserInfo = async (userData) => {
//     return new Promise((resolve, reject) => {
//         const { userID, userPhone, userLocation, hashedPW } = userData;
// const hashedPW = await textToHash(userPW);
//         const fields = [];
//         const values = [];

//         if (userPhone !== undefined) {
//             fields.push('userPhone = ?');
//             values.push(userPhone);
//         }

//         if (userLocation !== undefined) {
//             fields.push('userLocation = ?');
//             values.push(userLocation);
//         }

//         if (userPW !== undefined) {
//             fields.push('userPW = ?');
//             values.push(userPW);
//         }

//         if (fields.length === 0) {
//             return reject(new Error('업데이트할 데이터가 없습니다.'));
//         }

//         const sql = `UPDATE user SET ${fields.join(', ')} WHERE userID = ?`;
//         values.push(userID);

//         db.query(sql, values, (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };
exports.editUserInfo = ({ userID, sql, values }) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

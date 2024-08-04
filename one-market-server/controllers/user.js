const bcrypt = require('bcrypt');
const userDB = require('../models/userDB');

//비밀번호 암호화
const textToHash = async (text) => {
    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(text, saltRounds);
        return hash;
    } catch (error) {
        return error;
    }
};

//회원 가입
exports.signup = async (req, res) => {
    const { userEmail, userPW, userName, userPhone } = req.body;
    try {
        const getUser = await userDB.getUser(userEmail);
        if (getUser.length) {
            res.status(401).json('이미 존재하는 아이디입니다.');
            return;
        }
        const hash = await textToHash(userPW);
        await userDB.signUp([userEmail, hash, userName, userPhone]);
        res.status(200).json('회원 가입 성공');
    } catch (error) {
        res.status(401).json('회원 가입 실패', error);
    }
};

// 암호화된 비밀번호 일치
const hashCompare = async (inputValue, hash) => {
    try {
        console.log(inputValue, hash);
        const isMatch = await bcrypt.compare(inputValue, hash);
        if (isMatch) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    } catch (error) {
        console.error(error);
        return error;
    }
};

//로그인 정보 일치 + 로그인 성공 시 session 전달
exports.loginCheck = async (req, res) => {
    const { userEmail, userPW } = req.body;
    try {
        const getUser = await userDB.getUser(userEmail);
        if (!getUser.length) {
            res.status(401).json('존재하지 않는 아이디입니다.');
            return;
        }
        let isMatch = false;
        for (const user of getUser) {
            const hashedPW = Buffer.from(user.userPW).toString();
            if (await hashCompare(userPW, hashedPW)) {
                isMatch = true;
                req.session.userID = user.userID;
                res.status(200).json({ session: req.session });
                break;
            }
        }
        if (!isMatch) {
            req.session.destroy();
            res.status(401).json('비밀번호가 일치하지 않습니다.');
            return;
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//세션 삭제
exports.logout = async (req, res) => {
    req.session.destroy(function (error) {
        if (error) {
            res.status(401).json('로그아웃 실패', error);
        } else {
            res.status(200).json('로그아웃 성공');
        }
    });
};

//접근 제어
exports.userData = async (req, res) => {
    const { userID } = req.body;
    if (userID) {
        const getUserData = await userDB.getUserData(userID);
        res.status(200).json(getUserData);
    } else {
        res.status(401).json('유저 정보 받아올 수 없음');
    }
};

// //회원 정보 수정
// exports.editUserInfo = async (req, res) => {
//     const { userID, userPhone, userLocation, userPW } = req.body;
//     console.log(userID, userPhone, userLocation, userPW);
//     if (userID) {
//         try {
//             let hashedPW = null;
//             if (userPW) {
//                 hashedPW = await textToHash(userPW);
//             }
//             const editUserInfoResult = await userDB.editUserInfo({
//                 userPhone,
//                 userLocation,
//                 hashedPW,
//                 userID,
//             });

//             // 업데이트된 사용자 정보를 반환 (예시를 위해 getUserData 사용)
//             const updatedUserData = await userDB.getUserData(userID);

//             res.status(200).json(updatedUserData);
//         } catch (error) {
//             console.error('유저 정보 수정 중 오류:', error);
//             res.status(500).json('유저 정보 수정 중 오류 발생');
//         }
//     } else {
//         res.status(401).json('유저 정보 받아올 수 없음');
//     }
// };
// 회원 정보 수정
exports.editUserInfo = async (req, res) => {
    const { userID, userPhone, userLocation, userPW } = req.body;
    console.log(userID, userPhone, userLocation, userPW);
    if (userID) {
        try {
            const fields = [];
            const values = [];

            // 비밀번호가 제공된 경우에만 해시화 및 업데이트
            if (userPW) {
                const hashedPW = await textToHash(userPW);
                fields.push('userPW = ?');
                values.push(hashedPW);
            }

            if (userPhone !== undefined) {
                fields.push('userPhone = ?');
                values.push(userPhone);
            }

            if (userLocation !== undefined) {
                fields.push('userLocation = ?');
                values.push(userLocation);
            }

            if (fields.length === 0) {
                return res.status(400).json('업데이트할 데이터가 없습니다.');
            }

            const sql = `UPDATE user SET ${fields.join(', ')} WHERE userID = ?`;
            values.push(userID);

            await userDB.editUserInfo({ userID, sql, values });

            // 업데이트된 사용자 정보를 반환 (예시를 위해 getUserData 사용)
            const updatedUserData = await userDB.getUserData(userID);

            res.status(200).json(updatedUserData);
        } catch (error) {
            console.error('유저 정보 수정 중 오류:', error);
            res.status(500).json('유저 정보 수정 중 오류 발생');
        }
    } else {
        res.status(401).json('유저 정보 받아올 수 없음');
    }
};

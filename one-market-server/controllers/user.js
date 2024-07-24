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
        res.status(401).json('회원 가입 실ㅠㅐ', error);
    }
};

// 암호화된 비밀번호 일치
const hashCompare = async (inputValue, hash) => {
    try {
        const isMatch = await bcrypt.compare(inputValue, hash);
        if (isMatch) {
            return true;
        } else {
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
    console.log('삭제 하기전 :', req.session);
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
    console.log(userID);
    if (userID) {
        const getUserData = await userDB.getUserData(userID);
        res.status(200).json(getUserData);
    } else {
        res.status(401).json('유저 정보 받아올 수 없음');
    }
};

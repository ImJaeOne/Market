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
    const { userEmail, userPW, userName } = req.body;
    try {
        const getUser = await userDB.getUser(userEmail);
        if (getUser.length) {
            res.status(401).json('이미 존재하는 아이디입니다.');
            return;
        }
        const hash = await textToHash(userPW);
        const signup = await userDB.signUp([userEmail, hash, userName]);
        res.status(200).json('회원 가입 성공');
    } catch (error) {
        res.status(500).json(error);
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

//로그인 정보 일치
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
                break;
            }
        }
        if (!isMatch) {
            req.session.destroy();
            res.status(401).json('비밀번호가 일치하지 않습니다.');
            return;
        } else {
            req.session.is_logined = true;
            req.session.userID = getUser[0].userID;
            console.log('세션 정보 : ', req.session);
            userDB.updateSession(getUser[0].userID);
            console.log('회원 정보 : ', getUser[0]);
            res.status(200).json({ session: req.session });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//회원 정보
exports.getSession = (req, res) => {
    const session = req.session;
    console.log('session to client : ', session);
    res.status(200).json({ session: session });
};

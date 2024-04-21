import axios from 'axios';
import Cookies from 'js-cookie';

const setCookie = (name, value, options) => {
    Cookies.set(name, value, options);
};

const getCookie = (name) => {
    return Cookies.get(name);
};

const removeCookie = (name) => {
    Cookies.remove(name);
};

const checkSession = async (setSession) => {
    const sessionID = getCookie('sessionID');
    if (sessionID !== null) {
        await axios
            .post('http://localhost:3006/api/userData', { userID: sessionID })
            .then((result) => {
                setSession(result.data[0]);
                console.log('세션 접근', result.data[0]);
            })
            .catch((error) => {
                setSession(null);
                console.error('세션 접근 에러', error);
            });
    } else {
        setSession(null);
    }
};

const handleLogin = async (userEmail, userPW) => {
    try {
        const result = await axios.post(
            'http://localhost:3006/api/loginCheck',
            {
                userEmail: userEmail,
                userPW: userPW,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        setCookie('sessionID', result.data.session.userID, { expires: 1 }); // 세션 쿠키 설정
        console.log('세션 정보: ', result.data.session);
        return result.data.session;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw new Error('로그인에 실패했습니다.');
    }
};

const handleLogout = async () => {
    try {
        await axios.post('http://localhost:3006/api/logout', null);
        removeCookie('sessionID'); // 세션 쿠키 제거
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw new Error('로그아웃에 실패했습니다.');
    }
};

const sessionAuth = {
    checkSession,
    getCookie,
    handleLogin,
    handleLogout,
};

export default sessionAuth;

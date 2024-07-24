import axios from 'axios';
import Cookies from 'js-cookie';
import { SET_SESSION, CLEAR_SESSION } from './SessionReducer';

const setCookie = (name, value, options) => {
    Cookies.set(name, value, options);
};

const getCookie = (name) => {
    return Cookies.get(name);
};

const removeCookie = (name) => {
    Cookies.remove(name);
};

const checkSession = async (dispatch) => {
    const sessionID = getCookie('sessionID');
        if (sessionID) {
            await axios
                .post('http://localhost:3006/api/userData', { userID: sessionID })
                .then((result) => {
                    dispatch({type: SET_SESSION, payload: result.data[0]})
                })
                .catch((error) => {
                    dispatch({ type: CLEAR_SESSION });
                    console.error('세션 접근 에러', error);
                });
        } else {
            dispatch({ type: 'CLEAR_SESSION' });
        }
};

const handleLogin = async (userEmail, userPW, dispatch) => {
    let res = [];
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
        setCookie('sessionID', result.data.session.userID, { expires: 1, path: '/', sameSite: 'strict' }); // 세션 쿠키 설정
        await axios
            .post('http://localhost:3006/api/userData', { userID: result.data.session.userID })
            .then((result) => {
                dispatch({ type: SET_SESSION, payload: result.data[0] });
                return result.data[0];
            })
            .catch((error) => {
                removeCookie('sessionID'); 
                res = null;
                return res;
            });
        return res;
    } catch (error) {
        console.error('로그인 실패:', error);
        throw new Error('로그인에 실패했습니다.');
    }
};

const handleLogout = async (dispatch) => {
    try {
        await axios.post('http://localhost:3006/api/logout', null);
        removeCookie('sessionID'); // 세션 쿠키 제거
        dispatch({ type: CLEAR_SESSION });
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

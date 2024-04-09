import './index.css';
import { Link, useHistory } from 'react-router-dom';
import { Input, message } from 'antd';
import axios from 'axios';

function HeaderComponent(props) {
    const history = useHistory();
    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const logout = async () => {
        await axios
            .post('http://localhost:3006/api/logout', null, {
                withCredentials: true,
            })
            .then((res) => {
                console.log('로그아웃 성공');
                document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                props.setSession(null);
                message.info('로그아웃 성공');
            })
            .catch((error) => {
                console.error('로그아웃 에러 : ', error);
            });
    };
    const prepare = () => {
        message.info('준비 중인 서비스입니다.');
    };
    return (
        <header id="header-wrap">
            <div id="header">
                <div id="left-header">
                    <Link to="/">
                        <span id="logo">
                            <img src="/images/one.png" alt="to-index" width="30px" height="30px" />
                            One Market
                        </span>
                    </Link>
                    <Link to="/products" className="nav-menu" alt="to-products">
                        중고거래
                    </Link>
                    <div
                        onClick={() => {
                            prepare();
                        }}
                        className="nav-menu"
                        alt="to-place"
                    >
                        거래지역
                    </div>
                </div>
                <div id="right-header">
                    <Search id="search" placeholder="물품이나 동네를 검색해보세요" onSearch={onSearch} />
                    <div>
                        {props.session !== null ? (
                            <div className="to-logout">
                                <div className="to-login">{props.session.userName}님</div>
                                <div
                                    className="to-login"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    로그아웃
                                </div>
                            </div>
                        ) : (
                            <div className="to-login" onClick={() => history.push('/login')}>
                                로그인
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderComponent;

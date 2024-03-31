import 'antd/dist/antd.css';
import './App.css';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import MainPageComponent from './main';
import ProductsPageComponent from './products';
import ProductPageComponent from './product';
import UploadPageComponent from './upload';
import LoginPageComponent from './login';
import SignupPageComponent from './signup';
import { message, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

function App() {
    const history = useHistory();

    const prepare = () => {
        message.info('준비 중인 서비스입니다.');
    };

    const { Search } = Input;
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    return (
        <div>
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
                        <div className="to-login" onClick={() => history.push('/login')}>
                            로그인
                        </div>
                    </div>
                </div>
            </header>
            <section id="body">
                <Switch>
                    <Route exact={true} path="/">
                        <MainPageComponent />
                    </Route>
                    <Route exact={true} path="/products">
                        <ProductsPageComponent />
                    </Route>
                    <Route exact={true} path="/product">
                        <ProductPageComponent />
                    </Route>
                    <Route exact={true} path="/upload">
                        <UploadPageComponent />
                    </Route>
                    <Route exact={true} path="/login">
                        <LoginPageComponent />
                    </Route>
                    <Route exact={true} path="/signup">
                        <SignupPageComponent />
                    </Route>
                </Switch>
            </section>
            <footer id="footer">
                <div id="info">
                    <div>
                        <b>제작</b> 임재원
                    </div>
                    <div>
                        <b>문의</b> dlawi0108@naver.com
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;

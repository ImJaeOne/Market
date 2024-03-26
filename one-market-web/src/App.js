import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import MainPageComponent from './main';
import ProductsPageComponent from './products';
import { message } from 'antd';

function App() {
    const prepare = () => {
        message.info('준비 중인 서비스입니다.');
    };

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
                        <input type="text" id="search" placeholder="물품이나 동네를 검색해보세요." />
                        <div className="to-link">로그인</div>
                    </div>
                </div>
            </header>
            <div id="body">
                <Switch>
                    <Route exact={true} path="/">
                        <MainPageComponent />
                    </Route>
                    <Route exact={true} path="/products">
                        <ProductsPageComponent />
                    </Route>
                </Switch>
            </div>
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

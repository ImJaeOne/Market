import 'antd/dist/antd.css';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HeaderComponent from './header';
import MainPageComponent from './main';
import ProductsPageComponent from './products';
import ProductPageComponent from './product';
import UploadPageComponent from './upload';
import LoginPageComponent from './login';
import SignupPageComponent from './signup';
import MyPageComponent from './mypage';
import UserInfoEditComponent from './edit-u-info';
import LocationProductComponent from './locationProduct';
import SessionProvider from './Session/SessionProvider';

function App() {
    const [search, setSearch] = useState(null);

    return (
        <SessionProvider>
            <BrowserRouter>
                <div>
                    <HeaderComponent setSearch={setSearch} />
                    <section id="body">
                        <Switch>
                            <Route exact={true} path="/">
                                <MainPageComponent />
                            </Route>
                            <Route exact={true} path="/products">
                                <ProductsPageComponent search={search} />
                            </Route>
                            <Route exact={true} path="/product/:productID">
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
                            <Route path="/mypage">
                                <MyPageComponent />
                            </Route>
                            <Route path="/update_info">
                                <UserInfoEditComponent />
                            </Route>
                            <Route exact={true} path="/location">
                                <LocationProductComponent />
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
            </BrowserRouter>
        </SessionProvider>
    );
}

export default App;

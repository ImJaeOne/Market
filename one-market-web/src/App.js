import 'antd/dist/antd.css';
import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import HeaderComponent from './header';
import MainPageComponent from './main';
import ProductsPageComponent from './products';
import ProductPageComponent from './product';
import UploadPageComponent from './upload';
import LoginPageComponent from './login';
import SignupPageComponent from './signup';
import MyPageComponent from './mypage';
import sessionAuth from './Session/sessionAuth';

function App() {
    const [session, setSession] = useState(null);
    const [search, setSearch] = useState(null);
    const [sessionLoading, setSessionLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                await sessionAuth.checkSession(setSession);
            } finally {
                setSessionLoading(false);
            }
        };

        loadSession();
    }, []);

    return (
        <div>
            <HeaderComponent session={session} setSession={setSession} setSearch={setSearch} />
            <section id="body">
                <Switch>
                    <Route exact={true} path="/">
                        <MainPageComponent />
                    </Route>
                    <Route exact={true} path="/products">
                        <ProductsPageComponent
                            session={session}
                            setSession={setSession}
                            search={search}
                            setSearch={setSearch}
                        />
                    </Route>
                    <Route exact={true} path="/product/:productID">
                        <ProductPageComponent
                            session={session}
                            setSession={setSession}
                            sessionLoading={sessionLoading}
                        />
                    </Route>
                    <Route exact path="/upload">
                        <UploadPageComponent session={session} setSession={setSession} sessionLoading={ sessionLoading} />
                    </Route>
                    <Route exact={true} path="/login">
                        <LoginPageComponent session={session} setSession={setSession} />
                    </Route>
                    <Route exact={true} path="/signup">
                        <SignupPageComponent />
                    </Route>
                    <Route exact={true} path="/mypage">
                        <MyPageComponent/>
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

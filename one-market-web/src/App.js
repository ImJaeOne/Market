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
import axios from 'axios';

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            //쿠키에서 userID값만 가져오기
            const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
            let userID = null;
            for (const cookie of cookies) {
                if (cookie.startsWith('userID=')) {
                    userID = cookie.substring('userID='.length);
                    break;
                }
            }
            await axios
                .post(
                    'http://localhost:3006/api/userData',
                    { userID: userID },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                )
                .then((result) => {
                    setSession(result.data[0]);
                    console.log('세션 접근', result.data[0]);
                })
                .catch((error) => {
                    setSession(null);
                    console.error('세션 접근 에러', error);
                });
        };
        checkSession();
    }, []);

    return (
        <div>
            <HeaderComponent session={session} setSession={setSession} />
            <section id="body">
                <Switch>
                    <Route exact={true} path="/">
                        <MainPageComponent />
                    </Route>
                    <Route exact={true} path="/products">
                        <ProductsPageComponent session={session} setSession={setSession} />
                    </Route>
                    <Route exact={true} path="/product/:productID">
                        <ProductPageComponent />
                    </Route>
                    <Route exact path="/upload">
                        <UploadPageComponent session={session} setSession={setSession} />
                    </Route>
                    <Route exact={true} path="/login">
                        <LoginPageComponent session={session} setSession={setSession} />
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

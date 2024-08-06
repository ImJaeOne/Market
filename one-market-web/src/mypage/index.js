import './index.css';
import { useEffect, useReducer, createContext, useMemo, useContext } from 'react';
import { Link, NavLink, Route, useHistory, Redirect } from 'react-router-dom';
import { Divider, message, Spin, Avatar } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { SessionContext } from '../Session/SessionProvider';
import MyPageProductComponent from './product';
import MyPageWishComponent from './wish';
import MyPageReplyComponent from './reply';
import axios from 'axios';

export const MyPageContext = createContext({
    myPageNum: [],
    myProducts: [],
    myWishes: [],
    myReply: [],
});

const initialState = {
    myPageNum: {
        myProductsNum: 0,
        myWishNum: 0,
        myReplyNum: 0,
    },
    myProducts: [],
    myWishes: [],
    myReply: [],
};

export const MyProducts = 'MyProducts';
export const MyWish = 'MyWish';
export const MyReply = 'MyReply';

const reducer = (state, action) => {
    switch (action.type) {
        case MyProducts:
            return {
                ...state,
                myPageNum: {
                    ...state.myPageNum,
                    myProductsNum: action.myProductsNum,
                },
                myProducts: action.myProducts,
            };
        case MyWish:
            return {
                ...state,
                myPageNum: {
                    ...state.myPageNum,
                    myWishNum: action.myWishNum,
                },
                myWishes: action.myWishes,
            };
        case MyReply:
            return {
                ...state,
                myPageNum: {
                    ...state.myPageNum,
                    myReplyNum: action.myReplyNum,
                },
                myReply: action.myReply,
            };
        default:
            return state;
    }
};

const MyPageComponent = () => {
    const history = useHistory();
    const [myPageState, myPageDispatch] = useReducer(reducer, initialState);
    const { myPageNum, myProducts, myWishes, myReply } = myPageState;
    const { state } = useContext(SessionContext);
    const { session, sessionLoading } = state;

    console.log(session);

    const value = useMemo(
        () => ({ myPageNum, myPageDispatch, myProducts, myWishes, myReply }),
        [myPageNum, myPageDispatch, myProducts, myWishes, myReply]
    );

    useEffect(() => {
        if (!sessionLoading) {
            if (session && session.userID) {
                axios
                    .all([
                        axios.get(`http://localhost:3006/product/myProducts/${session.userID}`),
                        axios.get(`http://localhost:3006/product/myWish/${session.userID}`),
                        axios.get(`http://localhost:3006/product/myReply/${session.userID}`),
                    ])
                    .then(
                        axios.spread((productsResult, wishResult, replyResult) => {
                            const products = productsResult.data;
                            const wishes = wishResult.data;
                            const reply = replyResult.data;

                            myPageDispatch({
                                type: MyProducts,
                                myProductsNum: products.length,
                                myProducts: products,
                            });

                            myPageDispatch({
                                type: MyWish,
                                myWishNum: wishes.length,
                                myWishes: wishes,
                            });

                            myPageDispatch({
                                type: MyReply,
                                myReplyNum: reply.length,
                                myReply: reply,
                            });
                        })
                    )
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                history.push('/login');
                message.error('로그인이 필요합니다.');
            }
        }
    }, [session, sessionLoading, history, myPageDispatch]);

    if (sessionLoading) {
        return <Spin tip="세션 정보를 불러오는 중입니다..." />;
    }

    if (!session) {
        return 
    }

    return (
        <div id="mypage">
            <h1 id="mypage-headline">마이페이지</h1>
            <div id="mypage-user">
                <Link to={`/update_info`} className="mypage-update">
                    <EditOutlined />내 정보 수정하기
                </Link>
                <div className="mypage-user-wrap">
                    <Avatar className="mypage-avatar">{session.userName.slice(1)}</Avatar>
                    <div id="mypage_info">
                        <div className="mypage-name">{session.userName}님</div>
                        <div className="mypage-phone">
                            <div className="mypage-icategory">전화번호</div>
                            {session.userPhone}
                        </div>
                        <div className="mypage-location">
                            <div className="mypage-icategory">지역</div>
                            {session.userLocation ? session.userLocation : '비공개'}
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div id="mypage-menu">
                <div id="mypage-category-wrap">
                    <NavLink to="/mypage/product" className="mypage-category" activeClassName="active-category">
                        상품<span className="mypage-category-num">{myPageNum.myProductsNum}</span>
                    </NavLink>
                    <NavLink to="/mypage/wish" className="mypage-category" activeClassName="active-category">
                        찜<span className="mypage-category-num">{myPageNum.myWishNum}</span>
                    </NavLink>
                    <NavLink to="/mypage/reply" className="mypage-category" activeClassName="active-category">
                        댓글<span className="mypage-category-num">{myPageNum.myReplyNum}</span>
                    </NavLink>
                </div>
                <MyPageContext.Provider value={value}>
                    <Route exact path="/mypage">
                        <Redirect to="/mypage/product" />
                    </Route>
                    <Route exact path="/mypage/product">
                        <MyPageProductComponent />
                    </Route>
                    <Route exact path="/mypage/wish">
                        <MyPageWishComponent />
                    </Route>
                    <Route exact path="/mypage/reply">
                        <MyPageReplyComponent />
                    </Route>
                </MyPageContext.Provider>
            </div>
        </div>
    );
};

export default MyPageComponent;

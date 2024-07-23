import './index.css';
import { useEffect } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import { Divider,message, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MyPageProductComponent from './product';
import MyPageWishComponent from './wish';
import MyPageReplyComponent from './reply';

const MyPageComponent = (props) => {
    const { session, sessionLoading } = props;
    const history = useHistory();
    useEffect(() => {
        if (session) {
            return;
        } else if (!sessionLoading) {
            history.push('/login');
            message.error('로그인이 필요합니다.');
        }
    }, [session, sessionLoading, history]);
    if (sessionLoading) {
        return <Spin tip="세션 정보를 불러오는 중입니다..." />;
    }

    return (
        <div id="mypage">
            <h1 id="mypage-headline">마이페이지</h1>
            <div id="mypage-user">
                <Link to={`/update_info`} className="mypage-update">
                    <EditOutlined />내 정보 수정하기
                </Link>
                <div className="mypage-user-wrap">
                    <img className="mypage-avatar" src="images/avatar.png" alt="profile-img" />
                    <div id="mypage_info">
                        <div className="mypage-name">임재원 님</div>
                        <div className="mypage-phone">
                            <div className="mypage-icategory">연락처</div>
                            010-5098-9059
                        </div>
                        <div className="mypage-location">
                            <div className="mypage-icategory">지역</div>
                            경상남도 진주시
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div id="mypage-menu">
                <div id="mypage-category-wrap">
                    <Link to="/mypage/product" className="mypage-category">
                        상품<span className="mypage-category-num">2</span>
                    </Link>
                    <Link to="/mypage/wish" className="mypage-category">
                        찜<span className="mypage-category-num">0</span>
                    </Link>
                    <Link to="/mypage/reply" className="mypage-category">
                        댓글<span className="mypage-category-num">0</span>
                    </Link>
                </div>
                        <Route exact path="/mypage/product">
                            <MyPageProductComponent />
                        </Route>
                        <Route exact path="/mypage/wish">
                            <MyPageWishComponent />
                        </Route>
                        <Route exact path="/mypage/reply">
                            <MyPageReplyComponent />
                        </Route>
            </div>
        </div>
    );
};

export default MyPageComponent;

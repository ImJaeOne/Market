import './index.css'
import { EditOutlined } from '@ant-design/icons';

const MyPageComponent = () => {
    return (
        <div id="mypage">
            <h1 id="mypage-headline">마이페이지</h1>
            <div id="mypage-user">
                <div className="mypage-update"><EditOutlined/>내 정보 수정하기</div>
                <div className="mypage-user-wrap">
                    <img className="mypage-avatar" src="images/avatar.png" alt="profile-img" />
                    <div className="mypage-name">임재원 님</div>
                </div>
            </div>
        </div>
    );
}

export default MyPageComponent;
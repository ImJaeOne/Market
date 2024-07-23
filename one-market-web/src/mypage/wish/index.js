import { Divider } from 'antd';
import '../mypagecategory.css'
const MyPageWishComponent = () => {
    return (
        <div id="mypage-content">
            <div className="content-name">
                찜 <span className="content-num">0</span>
            </div>
            <Divider />
            <div className="content">
                찜한 상품이 없습니다.
            </div>
        </div>
    )
}

export default MyPageWishComponent;
import { Divider } from 'antd';
import '../mypagecategory.css'
const MyPageReplyComponent = () => {
    return (
        <div id="mypage-content">
            <div className="content-name">
                댓글 <span className="content-num">0</span>
            </div>
            <Divider />
            <div className="content">
                등록한 댓글이 없습니다.
            </div>
        </div>
    )
}

export default MyPageReplyComponent;
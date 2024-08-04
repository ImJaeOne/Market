import { Divider } from 'antd';
import '../mypagecategory.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { MyPageContext } from '../index';

const MyPageReplyComponent = () => {
    const { myPageNum, myReply } = useContext(MyPageContext);
    console.log(myReply);
    return (
        <div id="mypage-content">
            <div className="content-name">
                댓글 <span className="content-num">{myPageNum.myReplyNum}</span>
            </div>
            <Divider />
            <div className="content">
                <div id="reply-list">
                    {myReply.length > 0 ? (
                        myReply.map((reply) => (
                            <div className="reply-card" key={`${reply.type}-${reply[reply.type + 'ID']}`}>
                                <Link to={`/product/${reply.productID}`} className="reply-product-info">
                                    <div className="reply-product-img-wrap">
                                        <img
                                            className="reply-product-img"
                                            src={`http://localhost:3006/uploads/${reply.productImgUrl}`}
                                            alt="product-img"
                                        />
                                    </div>
                                    <div className="reply-product-details">
                                        <div>
                                            <span className="reply-product-details-label">상품명</span>
                                            <span className="reply-product-name">{reply.productName}</span>
                                        </div>
                                        <div className="reply-content">
                                            <span className="reply-product-details-label">
                                                {(reply[reply.type + 'Text'] === 'replyText') ? '답글' : '댓글'}</span>
                                            <p>{reply[reply.type + 'Text']}</p>
                                            <div className="reply-footer">
                                                <span className="reply-date">
                                                    {dayjs(reply[reply.type + 'Date']).format('YYYY-MM-DD')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="no-product-message">댓글이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPageReplyComponent;

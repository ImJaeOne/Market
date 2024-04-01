import './index.css';
import { useState } from 'react';
import { Button, message, Form, Divider, Input } from 'antd';

function ProductPageComponent() {
    const [disabled, setDisabled] = useState(false);
    const [showTextarea, setShowTextarea] = useState(false);
    const [text, setText] = useState('');
    const [reply, setReply] = useState(false);
    const [owner, setOwner] = useState(false);

    const handleButtonClick = () => {
        setShowTextarea(!showTextarea);
        setText('');
    };

    const replyButton = () => {
        setShowTextarea(!showTextarea);
        setReply(!reply);
        console.log(text);
    };

    const handleTextareaChange = (e) => {
        setText(e.target.value);
    };
    const onClickPurchase = () => {
        message.info('상품 구매가 완료되었습니다.');
        setDisabled(true);
    };
    return (
        <div>
            <Form>
                <div id="image-box">
                    <img src="/images/notebook1.jpg" alt="product-img" />
                </div>
                <div id="profile-box">
                    <img src="/images/avatar.png" alt="avatar" />
                    <span>임재원</span>
                </div>
                <div id="contents-box">
                    <div id="name">맥북 16인치</div>
                    <div id="price">300000원</div>
                    <div id="createdAt">2024-03-26</div>
                    <Button
                        id="purchase-button"
                        size="large"
                        type="primary"
                        danger
                        onClick={onClickPurchase}
                        disabled={disabled}
                    >
                        구매하기
                    </Button>
                    <div id="description">임재원이 사용하던 맥북입니다. </div>
                    <div id="description">코딩할 때 주로 사용하던 노트북입니다.</div>
                </div>
                <div id="question">
                    <div id="question-header">
                        <h2>Q&A</h2>
                        <span>판매자에게 궁금한 내용을 물어보세요.</span>
                    </div>
                    <Divider />
                    <div id="comment-wrap">
                        <div className="comment-list">
                            <div className="comment-profile-box">
                                <img src="/images/avatar.png" alt="avatar" />
                                <span>강종협</span>
                            </div>
                            <div className="comment">망가진 곳은 없나요?</div>
                            {/* 게시물 주인만 보이도록 */}
                            {!reply && (
                                <Button className="owner-reply-toggle" onClick={handleButtonClick}>
                                    {showTextarea ? '취소' : '답글'}
                                </Button>
                            )}
                        </div>
                        {showTextarea && (
                            <div className="reply-area">
                                <Input.TextArea
                                    name="owner_reply_text"
                                    value={text}
                                    onChange={handleTextareaChange}
                                    placeholder="답글을 입력하세요"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                                <Button className="owner-reply-btn" onClick={replyButton} htmlType="submit">
                                    답글 달기
                                </Button>
                            </div>
                        )}
                        {reply && (
                            <div className="owner-reply">
                                <img className="owner-reply-arrow" src="/images/reply.png" alt="reply-arrow"></img>
                                <div className="comment-profile-box">
                                    <img src="/images/avatar.png" alt="avatar" />
                                    <span>강종협</span>
                                </div>
                                <div className="comment">{text}</div>
                            </div>
                        )}
                        <Divider />
                        {!showTextarea && (
                            <div className="reply-area">
                                <Input.TextArea
                                    name="customer_reply_text"
                                    value={text}
                                    onChange={handleTextareaChange}
                                    placeholder="질문을 입력하세요"
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                                <Button className="customer-reply-btn" onClick={replyButton} htmlType="submit">
                                    댓글
                                </Button>
                            </div>
                        )}
                        {reply && (
                            <div className="customer-reply">
                                <div className="comment-profile-box">
                                    <img src="/images/avatar.png" alt="avatar" />
                                    <span>임재원</span>
                                </div>
                                <div className="comment">{text}</div>
                            </div>
                        )}
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default ProductPageComponent;

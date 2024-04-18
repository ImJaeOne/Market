import './index.css';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, message, Form, Divider, Input } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

function ProductPageComponent(props) {
    const { session, setSession } = props;
    const [askForm] = Form.useForm();
    const [answerForm] = Form.useForm();
    const { productID } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [ask, setAsk] = useState([]);
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productResult = await axios.get(`http://localhost:3006/product/${productID}`);
                const productData = productResult.data;
                setProduct(productData[0]);

                const askResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
                const askData = askResult.data;
                setAsk(askData);

                const answerResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
                const answerData = answerResult.data;
                setAnswer(answerData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [productID]);
    if (session === null) {
        setSession(null);
        history.push('/login');
        message.error('로그인이 필요합니다.', 3);
    }

    const toggleAnswerTextarea = (askID) => {
        setAsk((prevAsk) =>
            prevAsk.map((askItem) =>
                askItem.askID === askID ? { ...askItem, showTextarea: !askItem.showTextarea } : askItem
            )
        );
    };

    const onSubmitAsk = async (values, form) => {
        try {
            console.log('ASK!!!!');
            await axios.post('http://localhost:3006/ask/setAsk', {
                askText: values.askText,
                productID: productID,
                userID: session.userID,
            });
            form.resetFields();
            const updatedResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
            const updatedAsk = updatedResult.data.map((ask) => ({ ...ask, showTextarea: false }));
            setAsk(updatedAsk);
        } catch (error) {
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`);
        }
    };

    const onDeleteAsk = async (askID) => {
        try {
            await axios.delete('http://localhost:3006/ask/delete', {
                data: {
                    askID: askID,
                },
            });
            const updatedResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
            const updatedAsk = updatedResult.data.map((ask) => ({ ...ask, showTextarea: false }));
            setAsk(updatedAsk);
        } catch (error) {
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`);
        }
    };

    const onSubmitAnswer = async (values, form, askID) => {
        try {
            console.log('ANSWER!!!!');
            await axios.post('http://localhost:3006/answer/setAnswer', {
                answerText: values.answerText,
                productID: productID,
                userID: session.userID,
                askID: askID,
            });
            const updatedResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
            const updatedAnswer = updatedResult.data;
            setAnswer(updatedAnswer);
            toggleAnswerTextarea(askID);
            form.resetFields();
        } catch (error) {
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`);
        }
    };

    const onDeleteAnswer = async (answerID) => {
        console.log(answerID);
        try {
            await axios.delete('http://localhost:3006/answer/delete', {
                data: {
                    answerID: answerID,
                },
            });
            const updatedResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
            const updatedAnswer = updatedResult.data;
            setAnswer(updatedAnswer);
        } catch (error) {
            console.log(error);
            message.error(`에러가 발생했습니다. ${error.message}`);
        }
    };

    if (product === null) {
        return <h1>상품 정보를 받고 있습니다...</h1>;
    }
    const onClickPurchase = async () => {
        await axios
            .post(`http://localhost:3006/product/purchase/${productID}`)
            .then((result) => {
                message.info('상품 구매가 완료되었습니다.');
            })
            .catch((error) => {
                message.error('상품 구매에 실패했습니다.');
            });
    };
    const onClickPurchaseCancel = async () => {
        await axios
            .post(`http://localhost:3006/product/purchaseCancel/${productID}`)
            .then((result) => {
                message.info('상품 구매가 취소되었습니다.');
            })
            .catch((error) => {
                message.error('상품 구매 취소에 실패했습니다.');
            });
    };

    return (
        <div>
            <Form initialValues={{}}>
                <div id="image-box">
                    <img src={`http://localhost:3006/uploads/${product.productImgUrl}`} alt="product-img" />
                </div>
                <div id="profile-box">
                    <img src="/images/avatar.png" alt="avatar" />
                    <span>{product.userName}</span>
                </div>
                <div id="contents-box">
                    <div id="name">{product.productName}</div>
                    <div id="price">{product.productPrice}</div>
                    <div id="createdAt">{dayjs(product.productUploadDate).format('YYYY-MM-DD')}</div>
                    <Button
                        id="purchase-button"
                        size="large"
                        type="primary"
                        danger
                        onClick={product.productsoldout === 1 ? onClickPurchaseCancel : onClickPurchase}
                    >
                        {product.productsoldout === 1 ? '구매 취소' : '구매하기'}
                    </Button>
                    <pre id="description">{product.productDescription} </pre>
                </div>
            </Form>
            <div id="question">
                <div id="question-header">
                    <h2>Q&A</h2>
                    <span>판매자에게 궁금한 내용을 물어보세요.</span>
                </div>
                <Divider />
                <div id="comment-wrap">
                    {ask.map(function (ask, index) {
                        return (
                            <div className="comment-list">
                                <div className="comment-profile-box">
                                    <img src="/images/avatar.png" alt="avatar" />
                                    <span>{ask.userName}</span>
                                </div>
                                <div className="comment">{ask.askText}</div>
                                {session.userID === ask.userID || session.userID === product.userID ? (
                                    <Button
                                        type="text"
                                        className="comment-delete"
                                        onClick={() => onDeleteAsk(ask.askID)}
                                    >
                                        x
                                    </Button>
                                ) : null}
                                <div className="comment-date">{dayjs(ask.askDate).format('YY-MM-DD')}</div>

                                {answer.map(function (answer, index) {
                                    return answer.askID === ask.askID ? (
                                        <div className="comment-list" key={index}>
                                            <div className="reply-arrow">ㄴ</div>
                                            <div className="comment-profile-box">
                                                <img src="/images/avatar.png" alt="avatar" />
                                                <span>{answer.userName}</span>
                                            </div>
                                            <div className="comment">{answer.answerText}</div>
                                            {session.userID === answer.userID || session.userID === product.userID ? (
                                                <Button
                                                    type="text"
                                                    className="comment-delete"
                                                    onClick={() => onDeleteAnswer(answer.answerID)}
                                                >
                                                    x
                                                </Button>
                                            ) : null}
                                            <div className="comment-date">
                                                {dayjs(answer.answerDate).format('YY-MM-DD')}
                                            </div>
                                        </div>
                                    ) : null;
                                })}
                                {session.userID === product.userID || session.userID === ask.userID ? (
                                    <Button
                                        className="owner-reply-toggle"
                                        onClick={() => toggleAnswerTextarea(ask.askID)}
                                        size="small"
                                    >
                                        {ask.showTextarea ? '취소' : '답글'}
                                    </Button>
                                ) : null}
                                {ask.showTextarea ? (
                                    <Form
                                        form={answerForm}
                                        className="reply-wrap"
                                        onFinish={(values) => onSubmitAnswer(values, answerForm, ask.askID)}
                                    >
                                        <Form.Item name="answerText">
                                            <Input.TextArea
                                                placeholder="답글을 입력하세요"
                                                autoSize={{ minRows: 3, maxRows: 5 }}
                                            />
                                        </Form.Item>
                                        {console.log(ask.askID)}
                                        <Button className="customer-reply-btn" htmlType="submit">
                                            댓글
                                        </Button>
                                    </Form>
                                ) : null}
                            </div>
                        );
                    })}
                    <Form form={askForm} className="reply-wrap" onFinish={(values) => onSubmitAsk(values, askForm)}>
                        <Form.Item name="askText">
                            <Input.TextArea placeholder="질문을 입력하세요" autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                        <Button className="customer-reply-btn" htmlType="submit">
                            댓글
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ProductPageComponent;

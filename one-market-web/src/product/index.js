// import './index.css';
// import { useState, useEffect, useContext } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { Button, message, Form, Divider, Input, Spin, Badge } from 'antd';
// import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
// import { SessionContext } from '../Session/SessionProvider';
// import axios from 'axios';
// import dayjs from 'dayjs';

// function ProductPageComponent() {
//     const { state } = useContext(SessionContext);
//     const { session, sessionLoading } = state;
//     const [askForm] = Form.useForm();
//     const [answerForm] = Form.useForm();
//     const { productID } = useParams();
//     const [product, setProduct] = useState(null);
//     const [ask, setAsk] = useState([]);
//     const [answer, setAnswer] = useState([]);
//     const [wishNum, setWishNum] = useState(0);
//     const [wish, setWish] = useState(false);
//     const history = useHistory();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const productResult = await axios.get(`http://localhost:3006/product/${productID}`);
//                 const productData = productResult.data;
//                 setProduct(productData[0]);

//                 const askResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
//                 const askData = askResult.data;
//                 setAsk(askData);

//                 const answerResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
//                 const answerData = answerResult.data;
//                 setAnswer(answerData);

//                 const wishNum = await axios.get(`http://localhost:3006/product/wishNum/${productID}`);
//                 const wishNumData = wishNum.data.wishCount;
//                 setWishNum(wishNumData);

//                 const wish = await axios.get(`http://localhost:3006/product/wish/${productID}`, {
//                     params: { userID:session.userID },
//                 });
//                 const wishData = wish.data;
//                 if (wishData.length === 0) {
//                     setWish(false);
//                 } else {
//                     setWish(true);
//                 }
//             } catch (error) {
//                 message.error('로그인이 필요합니다.');
//             }
//         };
//         if (session) {
//             fetchData();
//         } else if (!sessionLoading) {
//             history.push('/login');
//             message.error('로그인이 필요합니다.');
//         }
//     }, [productID, session, sessionLoading, history]);

//     if (sessionLoading) {
//         return <Spin tip="세션 정보를 불러오는 중입니다..." />;
//     }

//     const toggleAnswerTextarea = (askID) => {
//         setAsk((prevAsk) =>
//             prevAsk.map((askItem) =>
//                 askItem.askID === askID ? { ...askItem, showTextarea: !askItem.showTextarea } : askItem
//             )
//         );
//     };

//     const onSubmitAsk = async (values, form) => {
//         try {
//             await axios.post('http://localhost:3006/ask/setAsk', {
//                 askText: values.askText,
//                 productID: productID,
//                 userID: session.userID,
//             });
//             form.resetFields();
//             const updatedResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
//             const updatedAsk = updatedResult.data.map((ask) => ({ ...ask, showTextarea: false }));
//             setAsk(updatedAsk);
//         } catch (error) {
//             console.log(error);
//             message.error(`로그인이 필요합니다.`);
//         }
//     };

//     const onDeleteAsk = async (askID) => {
//         try {
//             await axios.delete('http://localhost:3006/ask/delete', {
//                 data: {
//                     askID: askID,
//                 },
//             });
//             const updatedResult = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
//             const updatedAsk = updatedResult.data.map((ask) => ({ ...ask, showTextarea: false }));
//             setAsk(updatedAsk);
//         } catch (error) {
//             console.log(error);
//             message.error(`에러가 발생했습니다. ${error.message}`);
//         }
//     };

//     const onSubmitAnswer = async (values, form, askID) => {
//         try {
//             await axios.post('http://localhost:3006/answer/setAnswer', {
//                 answerText: values.answerText,
//                 productID: productID,
//                 userID: session.userID,
//                 askID: askID,
//             });
//             const updatedResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
//             const updatedAnswer = updatedResult.data;
//             setAnswer(updatedAnswer);
//             toggleAnswerTextarea(askID);
//             form.resetFields();
//         } catch (error) {
//             message.error(`에러가 발생했습니다. ${error.message}`);
//         }
//     };

//     const onDeleteAnswer = async (answerID) => {
//         try {
//             await axios.delete('http://localhost:3006/answer/delete', {
//                 data: {
//                     answerID: answerID,
//                 },
//             });
//             const updatedResult = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
//             const updatedAnswer = updatedResult.data;
//             setAnswer(updatedAnswer);
//         } catch (error) {
//             message.error(`에러가 발생했습니다. ${error.message}`);
//         }
//     };

//     if (product === null) {
//         return <h1>상품 정보를 받고 있습니다...</h1>;
//     }
//     const purchaseState = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3006/product/${productID}`);
//             setProduct(response.data);
//         } catch (error) {
//             message.error('상품 상태를 가져오는 데 실패했습니다.');
//         }
//     }
//     const onClickPurchase = async () => {
//         try {
//             await axios.post(`http://localhost:3006/product/purchase/${productID}`);
//             message.info('판매 상태가 변경되었습니다.');
//             purchaseState();
//         } catch (error) {
//             message.error('판매 상태 변경에 실패했습니다.');
//         }
//     };

//     const onClickPurchaseCancel = async () => {
//         try {
//             await axios.post(`http://localhost:3006/product/purchaseCancel/${productID}`);
//             message.info('판매 상태가 변경되었습니다.');
//             purchaseState();
//         } catch (error) {
//             message.error('판매 상태 변경에 실패했습니다.');
//         }
//     };
//     const onClickWish = async () => {
//         await axios
//             .post(`http://localhost:3006/product/setWish/${productID}`, { userID: session.userID })
//             .then((result) => {
//                 setWish(true);
//                 setWishNum((prevWishNum) => prevWishNum + 1);
//             })
//             .catch((error) => {
//                 message.error('다시 시도해주세요');
//             });
//     };
//     const onClickWishCancel = async () => {
//         await axios
//             .post(`http://localhost:3006/product/setWish/${productID}`, { userID: session.userID })
//             .then((result) => {
//                 setWish(false);
//                 setWishNum((prevWishNum) => prevWishNum - 1);
//             })
//             .catch((error) => {
//                 message.error('다시 시도해주세요');
//             });
//     };

//     return (
//         <div>
//             <Form initialValues={{}}>
//                 <div id="image-box">
//                     <img src={`http://localhost:3006/uploads/${product.productImgUrl}`} alt="product-img" />
//                 </div>
//                 <div id="profile-box">
//                     <img src="/images/avatar.png" alt="avatar" />
//                     <span>{product.userName}</span>
//                 </div>
//                 <div id="contents-box">
//                     <div id="name">
//                         {product.productName}
//                         <Badge count={wishNum}>
//                             <Button
//                                 icon={
//                                     wish ? (
//                                         <HeartTwoTone size="large" twoToneColor="red" />
//                                     ) : (
//                                         <HeartOutlined size="large" style={{ color: 'red' }} />
//                                     )
//                                 }
//                                 onClick={wish ? onClickWishCancel : onClickWish}
//                             />
//                         </Badge>
//                     </div>
//                     <div id="price">{product.productPrice}</div>
//                     <div id="createdAt">{dayjs(product.productUploadDate).format('YYYY-MM-DD')}</div>
//                     {product.userID === session.userID ? (
//                         <Button
//                             id="purchase-button"
//                             size="large"
//                             type="primary"
//                             danger={product.productsoldout === 1}
//                             onClick={product.productsoldout === 1 ? onClickPurchaseCancel : onClickPurchase}
//                         >
//                             {product.productsoldout === 1 ? '판매 완료' : '판매'}
//                         </Button>
//                     ) : null}
//                     <pre id="description">{product.productDescription} </pre>
//                 </div>
//             </Form>
//             <div id="question">
//                 <div id="question-header">
//                     <h2>Q&A</h2>
//                     <span>판매자에게 궁금한 내용을 물어보세요.</span>
//                 </div>
//                 <Divider />
//                 <div id="comment-wrap">
//                     {ask.map(function (ask, index) {
//                         return (
//                             <div className="comment-list">
//                                 <div className="comment-profile-box">
//                                     <img src="/images/avatar.png" alt="avatar" />
//                                     <span>{ask.userName}</span>
//                                 </div>
//                                 <div className="comment">{ask.askText}</div>
//                                 {session && (session.userID === ask.userID || session.userID === product.userID) && (
//                                     <Button
//                                         type="text"
//                                         className="comment-delete"
//                                         onClick={() => onDeleteAsk(ask.askID)}
//                                     >
//                                         x
//                                     </Button>
//                                 )}
//                                 <div className="comment-date">{dayjs(ask.askDate).format('YY-MM-DD')}</div>

//                                 {answer.map(function (answer, index) {
//                                     return answer.askID === ask.askID ? (
//                                         <div className="comment-list" key={index}>
//                                             <div className="reply-arrow">ㄴ</div>
//                                             <div className="comment-profile-box">
//                                                 <img src="/images/avatar.png" alt="avatar" />
//                                                 <span>{answer.userName}</span>
//                                             </div>
//                                             <div className="comment">{answer.answerText}</div>
//                                             {session &&
//                                                 (session.userID === answer.userID ||
//                                                     session.userID === product.userID) && (
//                                                     <Button
//                                                         type="text"
//                                                         className="comment-delete"
//                                                         onClick={() => onDeleteAnswer(answer.answerID)}
//                                                     >
//                                                         삭제
//                                                     </Button>
//                                                 )}
//                                             <div className="comment-date">
//                                                 {dayjs(answer.answerDate).format('YY-MM-DD')}
//                                             </div>
//                                         </div>
//                                     ) : null;
//                                 })}
//                                 {session && (session.userID === product.userID || session.userID === ask.userID) && (
//                                     <Button
//                                         className="owner-reply-toggle"
//                                         onClick={() => toggleAnswerTextarea(ask.askID)}
//                                         size="small"
//                                     >
//                                         {ask.showTextarea ? '취소' : '답글'}
//                                     </Button>
//                                 )}
//                                 {ask.showTextarea ? (
//                                     <Form
//                                         form={answerForm}
//                                         className="reply-wrap"
//                                         onFinish={(values) => onSubmitAnswer(values, answerForm, ask.askID)}
//                                     >
//                                         <Form.Item name="answerText">
//                                             <Input.TextArea
//                                                 placeholder="답글을 입력하세요"
//                                                 autoSize={{ minRows: 3, maxRows: 5 }}
//                                             />
//                                         </Form.Item>
//                                         {console.log(ask.askID)}
//                                         <Button className="customer-reply-btn" htmlType="submit">
//                                             댓글
//                                         </Button>
//                                     </Form>
//                                 ) : null}
//                             </div>
//                         );
//                     })}
//                     <Form form={askForm} className="reply-wrap" onFinish={(values) => onSubmitAsk(values, askForm)}>
//                         <Form.Item name="askText">
//                             <Input.TextArea placeholder="질문을 입력하세요" autoSize={{ minRows: 3, maxRows: 5 }} />
//                         </Form.Item>
//                         <Button className="customer-reply-btn" htmlType="submit">
//                             댓글
//                         </Button>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductPageComponent;

import './index.css';
import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, message, Form, Divider, Input, Spin, Badge, Avatar } from 'antd';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { SessionContext } from '../Session/SessionProvider';
import axios from 'axios';
import dayjs from 'dayjs';

function ProductPageComponent() {
    const { state } = useContext(SessionContext);
    const { session, sessionLoading } = state;
    const [askForm] = Form.useForm();
    const [answerForm] = Form.useForm();
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const [ask, setAsk] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [wishNum, setWishNum] = useState(0);
    const [wish, setWish] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session) {
                    const [productResult, askResult, answerResult, wishNumResult, wishResult] = await Promise.all([
                        axios.get(`http://localhost:3006/product/${productID}`),
                        axios.get(`http://localhost:3006/ask/getAsk/${productID}`),
                        axios.get(`http://localhost:3006/answer/getAnswer/${productID}`),
                        axios.get(`http://localhost:3006/product/wishNum/${productID}`),
                        axios.get(`http://localhost:3006/product/wish/${productID}`, {
                            params: { userID: session.userID },
                        }),
                    ]);

                    setProduct(productResult.data[0]);
                    setAsk(askResult.data);
                    setAnswer(answerResult.data);
                    setWishNum(wishNumResult.data.wishCount);
                    setWish(wishResult.data.length > 0);
                } else if (!sessionLoading) {
                    history.push('/login');
                    message.error('로그인이 필요합니다.');
                }
            } catch (error) {
                message.error('데이터를 불러오는 데 실패했습니다.');
            }
        };
        fetchData();
    }, [productID, session, sessionLoading, history]);

    if (sessionLoading || product === null) {
        return <Spin tip="로딩 중입니다..." />;
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
            await axios.post('http://localhost:3006/ask/setAsk', {
                askText: values.askText,
                productID: productID,
                userID: session.userID,
            });
            form.resetFields();
            const updatedAsk = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
            setAsk(updatedAsk.data.map((ask) => ({ ...ask, showTextarea: false })));
        } catch (error) {
            message.error('질문 등록에 실패했습니다.');
        }
    };

    const onDeleteAsk = async (askID) => {
        try {
            await axios.delete('http://localhost:3006/ask/delete', {
                data: { askID },
            });
            const updatedAsk = await axios.get(`http://localhost:3006/ask/getAsk/${productID}`);
            setAsk(updatedAsk.data.map((ask) => ({ ...ask, showTextarea: false })));
        } catch (error) {
            message.error('질문 삭제에 실패했습니다.');
        }
    };

    const onSubmitAnswer = async (values, form, askID) => {
        try {
            await axios.post('http://localhost:3006/answer/setAnswer', {
                answerText: values.answerText,
                productID: productID,
                userID: session.userID,
                askID,
            });
            const updatedAnswer = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
            setAnswer(updatedAnswer.data);
            toggleAnswerTextarea(askID);
            form.resetFields();
        } catch (error) {
            message.error('답변 등록에 실패했습니다.');
        }
    };

    const onDeleteAnswer = async (answerID) => {
        try {
            await axios.delete('http://localhost:3006/answer/delete', {
                data: { answerID },
            });
            const updatedAnswer = await axios.get(`http://localhost:3006/answer/getAnswer/${productID}`);
            setAnswer(updatedAnswer.data);
        } catch (error) {
            message.error('답변 삭제에 실패했습니다.');
        }
    };

    const onClickPurchase = async () => {
        try {
            await axios.post(`http://localhost:3006/product/purchase/${productID}`);
            message.info('판매 상태가 변경되었습니다.');
            const updatedProduct = await axios.get(`http://localhost:3006/product/${productID}`);
            setProduct(updatedProduct.data[0]);
        } catch (error) {
            message.error('판매 상태 변경에 실패했습니다.');
        }
    };

    const onClickPurchaseCancel = async () => {
        try {
            await axios.post(`http://localhost:3006/product/purchaseCancel/${productID}`);
            message.info('판매 상태가 변경되었습니다.');
            const updatedProduct = await axios.get(`http://localhost:3006/product/${productID}`);
            setProduct(updatedProduct.data[0]);
        } catch (error) {
            message.error('판매 상태 변경에 실패했습니다.');
        }
    };

    const onClickWish = async () => {
        try {
            await axios.post(`http://localhost:3006/product/setWish/${productID}`, { userID: session.userID });
            setWish(true);
            setWishNum((prevWishNum) => prevWishNum + 1);
        } catch (error) {
            message.error('찜 등록에 실패했습니다.');
        }
    };

    const onClickWishCancel = async () => {
        try {
            await axios.post(`http://localhost:3006/product/setWish/${productID}`, { userID: session.userID });
            setWish(false);
            setWishNum((prevWishNum) => prevWishNum - 1);
        } catch (error) {
            message.error('찜 취소에 실패했습니다.');
        }
    };

    return (
        <div>
            <Form initialValues={{}}>
                <div id="image-box">
                    <img src={`http://localhost:3006/uploads/${product.productImgUrl}`} alt="product-img" />
                </div>
                <div id="profile-box">
                    <Avatar className="product-avatar">{product.userName.slice(1)}</Avatar>
                    <span>{product.userName}</span>
                </div>
                <div id="contents-box">
                    <div id="name">
                        {product.productName}
                        <Badge count={wishNum}>
                            <Button
                                icon={
                                    wish ? (
                                        <HeartTwoTone size="large" twoToneColor="red" />
                                    ) : (
                                        <HeartOutlined size="large" style={{ color: 'red' }} />
                                    )
                                }
                                onClick={wish ? onClickWishCancel : onClickWish}
                            />
                        </Badge>
                    </div>
                    <div id="price">{product.productPrice}</div>
                    <div id="createdAt">{dayjs(product.productUploadDate).format('YYYY-MM-DD')}</div>
                    {product.userID === session.userID ? (
                        <Button
                            id="purchase-button"
                            size="large"
                            type="primary"
                            danger={product.productsoldout === 1}
                            onClick={product.productsoldout === 1 ? onClickPurchaseCancel : onClickPurchase}
                        >
                            {product.productsoldout === 1 ? '판매 완료' : '판매 중'}
                        </Button>
                    ) : (
                        <Button
                            id="purchase-button"
                            size="large"
                            type="primary"
                            danger={product.productsoldout === 1}
                            disabled={product.productsoldout === 1 ? true : false}
                        >
                            {product.productsoldout === 1 ? '판매 완료' : '판매 중'}
                        </Button>
                    )}
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
                    {ask.map((askItem) => (
                        <div className="comment-list" key={askItem.askID}>
                            <div className="comment-profile-box">
                                <img src="/images/avatar.png" alt="avatar" />
                                <span>{askItem.userName}</span>
                            </div>
                            <div className="comment">{askItem.askText}</div>
                            {session && (session.userID === askItem.userID || session.userID === product.userID) && (
                                <Button
                                    type="text"
                                    className="comment-delete"
                                    onClick={() => onDeleteAsk(askItem.askID)}
                                >
                                    x
                                </Button>
                            )}
                            <div className="comment-date">{dayjs(askItem.askDate).format('YY-MM-DD')}</div>

                            {answer.map((answerItem) =>
                                answerItem.askID === askItem.askID ? (
                                    <div className="comment-list" key={answerItem.answerID}>
                                        <div className="reply-arrow">ㄴ</div>
                                        <div className="comment-profile-box">
                                            <img src="/images/avatar.png" alt="avatar" />
                                            <span>{answerItem.userName}</span>
                                        </div>
                                        <div className="comment">{answerItem.answerText}</div>
                                        {session &&
                                            (session.userID === answerItem.userID ||
                                                session.userID === product.userID) && (
                                                <Button
                                                    type="text"
                                                    className="comment-delete"
                                                    onClick={() => onDeleteAnswer(answerItem.answerID)}
                                                >
                                                    삭제
                                                </Button>
                                            )}
                                        <div className="comment-date">
                                            {dayjs(answerItem.answerDate).format('YY-MM-DD')}
                                        </div>
                                    </div>
                                ) : null
                            )}
                            {session && (session.userID === product.userID || session.userID === askItem.userID) && (
                                <Button
                                    className="owner-reply-toggle"
                                    onClick={() => toggleAnswerTextarea(askItem.askID)}
                                    size="small"
                                >
                                    {askItem.showTextarea ? '취소' : '답글'}
                                </Button>
                            )}
                            {askItem.showTextarea && (
                                <Form
                                    form={answerForm}
                                    className="reply-wrap"
                                    onFinish={(values) => onSubmitAnswer(values, answerForm, askItem.askID)}
                                >
                                    <Form.Item name="answerText">
                                        <Input.TextArea
                                            placeholder="답글을 입력하세요"
                                            autoSize={{ minRows: 3, maxRows: 5 }}
                                        />
                                    </Form.Item>
                                    <Button className="customer-reply-btn" htmlType="submit">
                                        댓글
                                    </Button>
                                </Form>
                            )}
                        </div>
                    ))}
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

import { Divider } from 'antd';
import '../mypagecategory.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { message, Spin } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { SessionContext } from '../../Session/SessionProvider';

import { MyProducts, MyPageContext } from '../index';

const MyPageProductComponent = () => {
    const [myProducts, getMyProducts] = useState([]);
    const { myPageNum, myPageDispatch } = useContext(MyPageContext);
    const { state } = useContext(SessionContext);
    const { session, sessionLoading } = state;
    const history = useHistory();

    const getMyProductsNum = (n) => {
        myPageDispatch({
            type: MyProducts,
            myProductsNum: n,
        });
    };

    useEffect(
        function () {
            axios
                .get(`http://localhost:3006/product/myProducts/${session.userID}`)
                .then((result) => {
                    const products = result.data;
                    getMyProducts(products);
                    getMyProductsNum(result.data.length);
                })
                .catch((error) => {
                    console.error(error);
                });
            if (session) {
                return;
            } else if (!sessionLoading) {
                history.push('/login');
                message.error('로그인이 필요합니다.');
            }
        },
        [session, sessionLoading, history]
    );

    return (
        <div id="mypage-content">
            <div className="content-name">
                상품 <span className="content-num">{myPageNum.myProductsNum}</span>
            </div>
            <Divider />
            <div className="content">
                <div id="product-list">
                    {myProducts.map(function (product, index) {
                        return (
                            <Link to={`/product/${product.productID}`} className="product-card" key={product.productID}>
                                <div>
                                    <img
                                        className="product-img"
                                        src={`http://localhost:3006/uploads/${product.productImgUrl}`}
                                        alt="product-img"
                                    />
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">{product.productName}</span>
                                    <span className="product-price">{product.productPrice}</span>
                                    <div className="product-footer">
                                        <div className="product-seller">
                                            <img
                                                className="product-avatar"
                                                src="../images/avatar.png"
                                                alt="profile-img"
                                            />
                                            <span>{product.userName}</span>
                                        </div>
                                        <span className="product-date">
                                            {dayjs(product.productUploadDate).format('YYYY-MM-DD')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyPageProductComponent;

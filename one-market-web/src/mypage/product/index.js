import { Divider } from 'antd';
import '../mypagecategory.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const MyPageProductComponent = () => {
    const [myProducts, getMyProducts] = useState([]);

    useEffect(function () {
        axios
            .get('http://localhost:3006/product/myProducts')
            .then((result) => {
                const products = result.data;
                console.log('data',result.data);
                getMyProducts(products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div id="mypage-content">
            <div className="content-name">
                상품 <span className="content-num">2</span>
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
                                            <img className="product-avatar" src="../images/avatar.png" alt="profile-img" />
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

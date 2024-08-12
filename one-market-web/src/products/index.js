import './index.css';
import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Form, Select, message, Avatar } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SessionContext } from '../Session/SessionProvider';
import axios from 'axios';
import dayjs from 'dayjs';

function ProductsPageComponent({ search }) {
    const { state } = useContext(SessionContext);
    const { session } = state;
    const history = useHistory();
    const [products, getProducts] = useState([]);
    console.log(products);
    useEffect(
        function () {
            if (search) {
                getProducts(search.products);
            } else {
                axios
                    .get('http://localhost:3006/product/getProducts')
                    .then((result) => {
                        const products = result.data;
                        getProducts(products);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        [search]
    );
    const toUploadPage = () => {
        if (session === null) {
            history.push('/login');
            message.error('로그인이 필요합니다.');
        } else {
            history.push('/upload');
        }
    };
    const categoryChange = (value) => {
        axios
            .get(`http://localhost:3006/product/getProducts?category=${value}`)
            .then(function (result) {
                const products = result.data;
                getProducts(products);
                console.log(products);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const option = [
        {
            value: 'all',
            label: '전체',
        },
        {
            value: 'cloth',
            label: '의류',
        },
        {
            value: 'beuty',
            label: '뷰티',
        },
        {
            value: 'food',
            label: '식품',
        },
        {
            value: 'kitchen',
            label: '주방용품',
        },
        {
            value: 'daily',
            label: '생활용품',
        },
        {
            value: 'sport',
            label: '스포츠',
        },
        {
            value: 'electronics',
            label: '가전/디지털',
        },
        {
            value: 'furniture',
            label: '가구',
        },
        {
            value: 'health',
            label: '헬스',
        },
    ];
    return (
        <div id="products">
            <h1 id="product-headline">중고거래</h1>
            <Form>
                <div id="products-nav">
                    <Form.Item name="category" id="category">
                        <Select
                            defaultValue="전체"
                            style={{
                                width: 120,
                            }}
                            onChange={categoryChange}
                            options={option}
                        />
                    </Form.Item>
                    <Button id="product-upload" size="large" onClick={toUploadPage} icon={<DownloadOutlined />}>
                        상품 업로드
                    </Button>
                </div>
                <div id="product-list">
                    {products.map(function (product, index) {
                        return (
                            <Link to={`/product/${product.productID}`} className="product-card" key={product.productID}>
                                <div className="product-img-wrapper">
                                    <img
                                        src={`http://localhost:3006/uploads/${product.productImgUrl}`}
                                        alt="product-img"
                                        className={`product-img ${product.productsoldout === 1 ? 'product-blur' : ''}`}
                                    />
                                    {product.productsoldout === 1 && <div className="product-blur"></div>}
                                </div>
                                <div className="product-contents">
                                    <span className="product-name">{product.productName}</span>
                                    <span className="product-price">{product.productPrice}</span>
                                    <span className="product-location">
                                        {product.userLocation?product.userLocation.split(' ').slice(0, 2).join(' '):'지역 비공개'}
                                    </span>
                                    <div className="product-footer">
                                        <div className="product-seller">
                                            <Avatar className="product-avatar">{product.userName.slice(1)}</Avatar>
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
            </Form>
        </div>
    );
}

export default ProductsPageComponent;

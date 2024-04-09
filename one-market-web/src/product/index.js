import './index.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, message, Form } from 'antd';
import axios from 'axios';

function ProductPageComponent() {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);
    const getProduct = async () => {
        await axios
            .get(`http://localhost:3006/product/${productID}`)
            .then((result) => {
                setProduct(result.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    useEffect(function () {
        getProduct();
    }, []);
    if (product === null) {
        return <h1>상품 정보를 받고 있습니다...</h1>;
    }
    const onClickPurchase = async () => {
        await axios
            .post(`http://localhost:3006/product/purchase/${productID}`)
            .then((result) => {
                message.info('상품 구매가 완료되었습니다.');
                getProduct();
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
                getProduct();
            })
            .catch((error) => {
                message.error('상품 구매 취소에 실패했습니다.');
            });
    };
    return (
        <div>
            <Form>
                <div id="image-box">
                    <img src="/images/notebook1.jpg" alt="product-img" />
                </div>
                <div id="profile-box">
                    <img src="/images/avatar.png" alt="avatar" />
                    <span>{product[0].userName}</span>
                </div>
                <div id="contents-box">
                    <div id="name">{product[0].productName}</div>
                    <div id="price">{product[0].productPrice}</div>
                    <div id="createdAt">{product[0].productUploadDate}</div>
                    <Button
                        id="purchase-button"
                        size="large"
                        type="primary"
                        danger
                        onClick={product[0].productsoldout === 1 ? onClickPurchaseCancel : onClickPurchase}
                    >
                        {product[0].productsoldout === 1 ? '구매 취소' : '구매하기'}
                    </Button>
                    <pre id="description">{product[0].productDescription} </pre>
                </div>
            </Form>
        </div>
    );
}

export default ProductPageComponent;

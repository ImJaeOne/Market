import { Divider,Avatar } from 'antd';
import '../mypagecategory.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { MyPageContext } from '../index';

const MyPageProductComponent = () => {
    const { myPageNum, myProducts } = useContext(MyPageContext);

    return (
        <div id="mypage-content">
            <div className="content-name">
                상품 <span className="content-num">{myPageNum.myProductsNum}</span>
            </div>
            <Divider />
            <div className="content">
                <div id="product-list">
                    {myProducts.length > 0 ? (
                        myProducts.map(function (product, index) {
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
                    })
                    ) : (
                        <div className="no-product-message">등록된 상품이 없습니다.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPageProductComponent;

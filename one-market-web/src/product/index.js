import './index.css';
import { useState } from 'react';
import { Button, message } from 'antd';

function ProductPageComponent() {
    const [disabled, setDisabled] = useState(false);
    const onClickPurchase = () => {
        message.info('상품 구매가 완료되었습니다.');
        setDisabled(true);
    };
    return (
        <div>
            <div>
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
            </div>
        </div>
    );
}

export default ProductPageComponent;

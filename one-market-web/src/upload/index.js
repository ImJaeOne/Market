import './index.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Upload, Divider, Input, InputNumber, Button, message } from 'antd';
import axios from 'axios';

function UploadPageComponent() {
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();
    const onSubmit = (values) => {
        console.log(values.name);
        axios
            .post('https://13772fc3-b8e4-44a1-b7e9-69cd5fcfc611.mock.pstmn.io/product-value', {
                name: values.name,
                description: values.description,
                seller: values.seller,
                price: parseInt(values.price),
                imageUrl: null,
            })
            .then((result) => {
                console.log(result);
                history.replace('/products');
            })
            .catch((error) => {
                console.error(error);
                message.error(`에러가 발생했습니다. ${error.message}`);
            });
    };
    const onChangeImage = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            const response = info.file.response;
            const imageUrl = response.imageUrl;
            setImageUrl(imageUrl);
        }
    };
    return (
        <div id="upload-wrap">
            <Form name="upload" onFinish={onSubmit}>
                <Form.Item name="upload" label={<div className="upload-label">상품 사진</div>}>
                    <Upload
                        name="image"
                        action={'/image'}
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage}
                    >
                        {imageUrl ? (
                            <img id="upload-img" src={'/image'} alt="upload-img" />
                        ) : (
                            <div id="upload-img-placeholder">
                                <img src="/images/camera.png" alt="upload" />
                                <span>이미지를 업로드해주세요.</span>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Divider />
                <Form.Item
                    name="seller"
                    label={<div className="upload-label">판매자명</div>}
                    rules={[{ required: true, message: '판매자명을 입력해주세요.' }]}
                >
                    <Input className="upload-name" size="large" placeholder="판매자명을 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="name"
                    label={<div className="upload-label">상품명</div>}
                    rules={[{ required: true, message: '상품명을 입력해주세요.' }]}
                >
                    <Input className="upload-name" size="large" placeholder="상품명을 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="price"
                    label={<div className="upload-label">상품 가격</div>}
                    rules={[{ required: true, message: '상품가격을 입력해주세요.' }]}
                >
                    <InputNumber defaultValue={0} className="upload-price"></InputNumber>
                </Form.Item>
                <Divider />
                <Form.Item
                    name="description"
                    label={<div className="upload-label">상품 소개</div>}
                    rules={[{ required: true, message: '상품 소개 입력해주세요.' }]}
                >
                    <Input.TextArea
                        size="large"
                        id="product-description"
                        showCount
                        maxLength={300}
                        placeholder="상품 소개 입력해주세요."
                    />
                </Form.Item>
                <Form.Item>
                    <Button id="submit-btn" size="large" htmlType="submit">
                        상품 등록
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UploadPageComponent;

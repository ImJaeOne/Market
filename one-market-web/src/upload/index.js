import './index.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Upload, Divider, Input, InputNumber, Button, message, Select } from 'antd';
import axios from 'axios';

function UploadPageComponent(props) {
    const [imageUrl, setImageUrl] = useState(null);
    const history = useHistory();
    if (props.session === null) {
        history.push('/login');
        message.error('로그인이 필요합니다');
    }
    const onSubmit = (values) => {
        console.log(values);
        message.info('상품 등록이 완료되었습니다.');
        axios
            .post('http://localhost:3006/product/upload', {
                productName: values.productName,
                productCategory: values.productCategory,
                productDescription: values.productDescription,
                productPrice: parseInt(values.productPrice),
                productImageUrl: imageUrl,
                userID: props.session.userID,
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
            const imageUrl = response.productImageUrl;
            setImageUrl(imageUrl);
            console.log(imageUrl);
        }
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
        <div id="upload-wrap">
            <div id="upload-headline">상품 업로드</div>
            <Form name="upload" onFinish={onSubmit}>
                <Form.Item
                    name="productImageUrl"
                    label={<div className="upload-label">상품 사진</div>}
                    rules={[{ required: true, message: '상품 사진을 업로드해주세요.' }]}
                >
                    <Upload
                        name="image"
                        action={'http://localhost:3006/product/image'}
                        listType="picture"
                        showUploadList={false}
                        onChange={onChangeImage}
                    >
                        {imageUrl ? (
                            <img id="upload-img" src={`http://localhost:3006/uploads/${imageUrl}`} alt="upload-img" />
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
                    name="productCategory"
                    label={<div className="upload-label">카테고리</div>}
                    rules={[{ required: true, message: '카테고리를 선택해주세요.' }]}
                >
                    <Select
                        defaultValue="전체"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={option}
                    />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="productName"
                    label={<div className="upload-label">상품명</div>}
                    rules={[{ required: true, message: '상품명을 입력해주세요.' }]}
                >
                    <Input className="upload-name" size="large" placeholder="상품명을 입력해주세요." />
                </Form.Item>
                <Divider />
                <Form.Item
                    name="productPrice"
                    label={<div className="upload-label">상품 가격</div>}
                    rules={[{ required: true, message: '상품가격을 입력해주세요.' }]}
                >
                    <InputNumber defaultValue={0} className="upload-price"></InputNumber>
                </Form.Item>
                <Divider />
                <Form.Item
                    name="productDescription"
                    label={<div className="upload-label">상품 소개</div>}
                    rules={[{ required: true, message: '상품 소개를 입력해주세요.' }]}
                >
                    <Input.TextArea
                        size="large"
                        id="product-description"
                        showCount
                        maxLength={300}
                        placeholder="상품 소개를 입력해주세요."
                    />
                </Form.Item>
                <Form.Item>
                    <Button id="upload-submit-btn" size="large" htmlType="submit">
                        상품 등록
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UploadPageComponent;

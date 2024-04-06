import './index.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Upload, Divider, Input, InputNumber, Button, message, Select } from 'antd';
import axios from 'axios';

function UploadPageComponent(props) {
    const { session } = props;
    const [imageUrl, setImageUrl] = useState(null);
    const [isLogined, setIsLogined] = useState(false);
    console.log(isLogined);
    axios
        .post('http://localhost:3006/api/access', { session: `${session}` }, { withCredentials: true })
        .then((result) => {
            console.log('접근 가능');
            setIsLogined(true);
        })
        .catch((error) => {
            console.error('접근 불가능 : ', error);
            message.error('로그인이 필요한 서비스입니다.');
            history.push('/login');
        });
    const history = useHistory();
    const onSubmit = (values) => {
        console.log(values);
        axios
            .post('https://13772fc3-b8e4-44a1-b7e9-69cd5fcfc611.mock.pstmn.io/product-value', {
                name: values.name,
                category: values.category,
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
                    name="category"
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

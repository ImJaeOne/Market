import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SessionContext } from '../Session/SessionProvider';
import './index.css';

const UpdateUserInfoComponent = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(SessionContext);
    const { session, sessionLoading } = state;
    const [loading, setLoading] = useState(false);

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);

    useEffect(() => {
        if (!sessionLoading && !session) {
            history.push('/login');
            message.error('로그인이 필요합니다.');
        }
    }, [session, sessionLoading, history]);

    const onFinish = async (values) => {
        setLoading(true);
        console.log(values);
        try {
            const response = await axios.post('http://localhost:3006/api/editUserInfo', {
                userID: session.userID,
                userPhone: isEditingPhone ? values.userPhone : null,
                userLocation: isEditingLocation ? values.userLocation : null,
                userPW: isEditingPassword ? values.password : null,
            });
            if (response.status === 200) {
                message.success('회원정보가 성공적으로 수정되었습니다.');
                dispatch({
                    type: 'SET_SESSION',
                    payload: {
                        ...session,
                        userPhone: isEditingPhone ? values.userPhone : session.userPhone,
                        userLocation: isEditingLocation ? values.userLocation : session.userLocation,
                        userPW: isEditingPassword ? values.password : session.userPW,
                    },
                });
                setIsEditingPhone(false);
                setIsEditingPassword(false);
                setIsEditingLocation(false);
            } else {
                message.error('회원정보 수정에 실패했습니다.');
            }
        } catch (error) {
            message.error('회원정보 수정 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (sessionLoading) {
        return <Spin tip="세션 정보를 불러오는 중입니다..." />;
    }

    if (!session) {
        // 세션이 없으면 아무것도 렌더링하지 않음
        return null;
    }

    const option = [
        {
            value: '서울',
            label: '서울',
        },
        {
            value: '부산',
            label: '부산',
        },
        {
            value: '대구',
            label: '대구',
        },
        {
            value: '인천',
            label: '인천',
        },
        {
            value: '광주',
            label: '광주',
        },
        {
            value: '대전',
            label: '대전',
        },
        {
            value: '울산',
            label: '울산',
        },
        {
            value: '세종',
            label: '세종',
        },
        {
            value: '경기',
            label: '경기',
        },
        {
            value: '강원',
            label: '강원',
        },
        {
            value: '충북',
            label: '충북',
        },
        {
            value: '충남',
            label: '충남',
        },
        {
            value: '전북',
            label: '전북',
        },
        {
            value: '전남',
            label: '전남',
        },
        {
            value: '경북',
            label: '경북',
        },
        {
            value: '경남',
            label: '경남',
        },
        {
            value: '제주',
            label: '제주',
        },
    ];

    return (
        <div id="edit-u-info-wrap">
            <h1 id="edit-u-info-headline">회원정보 수정</h1>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    userPhone: session.userPhone,
                    userLocation: session.userLocation,
                }}
            >
                <Form.Item label={<div className="edit-u-info-label">전화번호</div>} className="edit-u-info-c">
                    {isEditingPhone ? (
                        <Form.Item
                            name="userPhone"
                            rules={[
                                { required: true, message: '전화번호를 입력해주세요.' },
                                {
                                    pattern: /^010-\d{4}-\d{4}$/,
                                    message: '전화번호는 010-1234-5678 형식으로 입력해주세요',
                                },
                            ]}
                        >
                            <div className="edit-u-info-t">
                                <Input />
                                <Button
                                    type="link"
                                    onClick={() => setIsEditingPhone(!isEditingPhone)}
                                    icon={<EditOutlined />}
                                >
                                    수정
                                </Button>
                            </div>
                        </Form.Item>
                    ) : (
                        <div className="edit-u-info-t">
                            {session.userPhone}
                            <Button
                                type="link"
                                onClick={() => setIsEditingPhone(!isEditingPhone)}
                                icon={<EditOutlined />}
                            >
                                수정
                            </Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label={<div className="edit-u-info-label">비밀번호</div>} className="edit-u-info-c">
                    {isEditingPassword ? (
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: '비밀번호를 입력해주세요.' },
                                {
                                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
                                    message: '영어와 숫자를 혼합하여 6자 이상 15자 이하로 입력해주세요',
                                },
                            ]}
                        >
                            <div className="edit-u-info-t">
                                <Input.Password />
                                <Button
                                    type="link"
                                    onClick={() => setIsEditingPassword(!isEditingPassword)}
                                    icon={<EditOutlined />}
                                >
                                    수정
                                </Button>
                            </div>
                        </Form.Item>
                    ) : (
                        <div className="edit-u-info-t">
                            ********
                            <Button
                                type="link"
                                onClick={() => setIsEditingPassword(!isEditingPassword)}
                                icon={<EditOutlined />}
                            >
                                수정
                            </Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label={<div className="edit-u-info-label">지역</div>} className="edit-u-info-c">
                    <div className="edit-u-info-t">
                        <Form.Item
                            name="userLocation"
                            rules={[{ required: isEditingLocation, message: '지역을 선택해주세요.' }]}
                        >
                            <Select options={option} disabled={!isEditingLocation} placeholder="지역을 선택해주세요" />
                        </Form.Item>
                        <Button
                            type="link"
                            onClick={() => setIsEditingLocation(!isEditingLocation)}
                            icon={<EditOutlined />}
                        >
                            수정
                        </Button>
                    </div>
                </Form.Item>
                <Form.Item className="edit-u-info-c">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={!(isEditingPhone || isEditingPassword || isEditingLocation)}
                    >
                        수정하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateUserInfoComponent;

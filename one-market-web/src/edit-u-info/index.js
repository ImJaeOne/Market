import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SessionContext } from '../Session/SessionProvider';

const { Option } = Select;

const UpdateUserInfoComponent = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(SessionContext);
    const { session, sessionLoading } = state;
    const [loading, setLoading] = useState(false);

    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingRegion, setIsEditingRegion] = useState(false);

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
                userPhone: isEditingPhone ? values.userPhone : session.userPhone,
                userLocation: isEditingRegion ? values.userLocation : session.userLocation,
                userPW: isEditingPassword ? values.password : session.userPW,
            });
            if (response.status === 200) {
                message.success('회원정보가 성공적으로 수정되었습니다.');
                dispatch({
                    type: 'SET_SESSION',
                    payload: {
                        ...session,
                        userPhone: isEditingPhone ? values.userPhone : session.userPhone,
                        userLocation: isEditingRegion ? values.userLocation : session.userLocation,
                        password: isEditingPassword ? values.password : session.password,
                    },
                });
                setIsEditingPhone(false);
                setIsEditingPassword(false);
                setIsEditingRegion(false);
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

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>회원정보 수정</h2>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    userPhone: session.userPhone,
                    userRegion: session.userRegion,
                }}
            >
                <Form.Item label="전화번호">
                    {isEditingPhone ? (
                        <Form.Item
                            name="userPhone"
                            rules={[{ required: true, message: '전화번호를 입력해주세요.' }]}
                            noStyle
                        >
                            <Input />
                        </Form.Item>
                    ) : (
                        <div>
                            {session.userPhone}
                            <Button type="link" onClick={() => setIsEditingPhone(true)} icon={<EditOutlined />}>
                                수정
                            </Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="비밀번호">
                    {isEditingPassword ? (
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
                            noStyle
                        >
                            <Input.Password />
                        </Form.Item>
                    ) : (
                        <div>
                            ********
                            <Button type="link" onClick={() => setIsEditingPassword(true)} icon={<EditOutlined />}>
                                수정
                            </Button>
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="지역">
                    {isEditingRegion ? (
                        <Form.Item
                            name="userLocation"
                            rules={[{ required: true, message: '지역을 선택해주세요.' }]}
                            noStyle
                        >
                            <Select>
                                <Option value="서울">서울</Option>
                                <Option value="부산">부산</Option>
                                <Option value="대구">대구</Option>
                                <Option value="인천">인천</Option>
                                <Option value="광주">광주</Option>
                                <Option value="대전">대전</Option>
                                <Option value="울산">울산</Option>
                                <Option value="세종">세종</Option>
                                <Option value="경기">경기</Option>
                                <Option value="강원">강원</Option>
                                <Option value="충북">충북</Option>
                                <Option value="충남">충남</Option>
                                <Option value="전북">전북</Option>
                                <Option value="전남">전남</Option>
                                <Option value="경북">경북</Option>
                                <Option value="경남">경남</Option>
                                <Option value="제주">제주</Option>
                            </Select>
                        </Form.Item>
                    ) : (
                        <div>
                            {session.userRegion}
                            <Button type="link" onClick={() => setIsEditingRegion(true)} icon={<EditOutlined />}>
                                수정
                            </Button>
                        </div>
                    )}
                </Form.Item>

                {(isEditingPhone || isEditingPassword || isEditingRegion) && (
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            수정하기
                        </Button>
                    </Form.Item>
                )}
            </Form>
        </div>
    );
};

export default UpdateUserInfoComponent;

import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { SessionContext } from '../Session/SessionProvider';
import KakaomapForUserInfo from '../kakaomap/kakaomapForUser';
import './index.css';

const UpdateUserInfoComponent = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(SessionContext);
    const { session, sessionLoading } = state;
    const [loading, setLoading] = useState(false);
    const [locationKakao, setLocationKakao] = useState(null);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);

    useEffect(() => {
        if (!sessionLoading && !session) {
            history.push('/login');
            message.error('로그인이 필요합니다.');
        }
    }, [session, sessionLoading, history]);

    const handleSubmit = async () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);
        const values = Object.fromEntries(formData.entries());

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3006/api/editUserInfo', {
                userID: session.userID,
                userPhone: isEditingPhone ? values.userPhone : null,
                userLocation: locationKakao ? locationKakao : null,
                userPW: isEditingPassword ? values.password : null,
            });
            if (response.status === 200) {
                message.success('회원정보가 성공적으로 수정되었습니다.');
                dispatch({
                    type: 'SET_SESSION',
                    payload: {
                        ...session,
                        userPhone: isEditingPhone ? values.userPhone : session.userPhone,
                        userLocation: locationKakao ? locationKakao : session.userLocation,
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    if (sessionLoading) {
        return <Spin tip="세션 정보를 불러오는 중입니다..." />;
    }

    if (!session) {
        return null;
    }

    return (
        <div id="edit-u-info-wrap">
            <h1 id="edit-u-info-headline">회원정보 수정</h1>
            <Form layout="vertical" onKeyDown={handleKeyPress}>
                <Form.Item label={<div className="edit-u-info-label">전화번호</div>} className="edit-u-info-c">
                    <div className="edit-u-info-t">
                        {isEditingPhone ? <Input name="userPhone" /> : <span>{session.userPhone}</span>}
                        <Button type="link" onClick={() => setIsEditingPhone(!isEditingPhone)} icon={<EditOutlined />}>
                            수정
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item label={<div className="edit-u-info-label">비밀번호</div>} className="edit-u-info-c">
                    <div className="edit-u-info-t">
                        {isEditingPassword ? <Input.Password name="password" /> : <span>********</span>}
                        <Button
                            type="link"
                            onClick={() => setIsEditingPassword(!isEditingPassword)}
                            icon={<EditOutlined />}
                        >
                            수정
                        </Button>
                    </div>
                </Form.Item>

                <Form.Item label={<div className="edit-u-info-label">지역</div>} className="edit-u-info-c">
                    <div>{locationKakao ? locationKakao : session.userLocation}</div>
                    <div className="edit-u-info-map">
                        <KakaomapForUserInfo
                            setLocationKakao={setLocationKakao}
                            locationKakao={locationKakao}
                            setIsEditingLocation={setIsEditingLocation}
                        />
                    </div>
                </Form.Item>
                <Form.Item className="edit-u-info-c">
                    <Button
                        type="primary"
                        onClick={handleSubmit}
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

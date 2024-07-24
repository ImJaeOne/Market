import './index.css';
import { useHistory } from 'react-router-dom';
import { Form, Input, Divider, Button, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import axios from 'axios';

function SignupPageComponent() {
    const history = useHistory();
    const onSubmit = async (values) => {
        axios
            .post('http://localhost:3006/api/signup', {
                userEmail: values.userEmail,
                userPW: values.userPW,
                userName: values.userName,
                userPhone: values.userPhone
            })
            .then((result) => {
                console.log(result);
                message.info(`회원가입 완료`);
                history.push('/login');
            })
            .catch((error) => {
                message.error(`중복된 아이디입니다.`);
                console.error(error);
            });
    };
    return (
        <div id="signup-wrap">
            <div id="signup-headline">회원 가입</div>
            <Form name="signup" onFinish={onSubmit}>
                <Form.Item
                    name="userEmail"
                    rules={[
                        { required: true, message: '아이디를 입력해주세요.' },
                        {
                            pattern: /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/,
                            message: '영어 소문자와 숫자를 혼합하여 6자 이상 12자 이하로 입력해주세요',
                        },
                    ]}
                >
                    <div className="text-input">
                        <img
                            src="/images/free-icon-email-closed-outlined-back-envelope-interface-symbol-54290.png"
                            className="id-img-icon"
                            alt="id-icon"
                        />
                        <Input className="signup-placeholder" size="large" placeholder="아이디" />
                    </div>
                </Form.Item>
                <Form.Item
                    name="userPW"
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요.' },
                        {
                            pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/,
                            message: '영어와 숫자를 혼합하여 6자 이상 15자 이하로 입력해주세요',
                        },
                    ]}
                >
                    <div className="pw-input">
                        <img src="/images/padlock.png" className="pw-img-icon" alt="pw-icon" />
                        <Input.Password className="signup-placeholder" size="large" placeholder="비밀번호" />
                    </div>
                </Form.Item>
                <Form.Item
                    name="userPW_cf"
                    dependencies={['userPW']}
                    rules={[
                        { required: true, message: '비밀번호를 확인해주세요.' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('userPW') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('비밀번호를 확인해주세요.'));
                            },
                        }),
                    ]}
                >
                    <div className="pw-input">
                        <img src="/images/free-icon-unlock-11874021.png" className="pw-img-icon" alt="pw-icon" />
                        <Input.Password className="signup-placeholder" size="large" placeholder="비밀번호 확인" />
                    </div>
                </Form.Item>
                <Form.Item name="userName" rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
                    <div className="text-input">
                        <img src="/images/user.png" className="pw-img-icon" alt="pw-icon" />
                        <Input className="signup-placeholder" size="large" placeholder="이름" />
                    </div>
                </Form.Item>
                <Form.Item
                    name="userPhone"
                    rules={[
                        { required: true, message: '전화번호를 입력해주세요' },
                        {
                            pattern: /^010-\d{4}-\d{4}$/,
                            message: '전화번호는 010-1234-5678 형식으로 입력해주세요',
                        },
                    ]}
                >
                    <div className="text-input">
                        <PhoneOutlined
                            className="pw-img-icon antd-phone"
                            alt="name-icon"
                            style={{ fontSize: '20px' }}
                        />
                        <Input className="signup-placeholder" size="large" placeholder="전화번호" />
                    </div>
                </Form.Item>
                <Divider />
                <Form.Item>
                    <Button id="signup-submit-btn" htmlType="submit">
                        가입하기
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default SignupPageComponent;

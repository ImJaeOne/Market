import './index.css';
import { useHistory } from 'react-router-dom';
import { Form, Input, Divider, Button, message } from 'antd';
import axios from 'axios';

function SignupPageComponent() {
    const history = useHistory();
    const onSubmit = async (values) => {
        axios
            .post('http://localhost:3006/api/signup', {
                userEmail: values.userEmail,
                userPW: values.userPW,
                userName: values.userName,
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
                <Form.Item name="userEmail" rules={[{ required: true, message: '아이디를 입력해주세요.' }]}>
                    <div className="text-input">
                        <img
                            src="/images/free-icon-email-closed-outlined-back-envelope-interface-symbol-54290.png"
                            className="id-img-icon"
                            alt="id-icon"
                        />
                        <Input className="signup-placeholder" size="large" placeholder="아이디를 입력해주세요." />
                    </div>
                </Form.Item>
                <Form.Item name="userPW" rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}>
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
